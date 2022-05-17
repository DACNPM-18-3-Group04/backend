/* eslint-disable no-throw-literal */
/* eslint-disable no-plusplus */
const { Op } = require('sequelize');
const {
  User,
  Property,
  District,
  Province,
  PropertyImage,
} = require('../../../models');
const { isEmpty, handle } = require('../../../utils/helpers');
const { getQueryMinMaxFloat, getQueryMinMaxInt } = require('./helpers');
const {
  DEFAULT_LIMIT_PAGiNATION,
} = require('../../../configs/constants/system');
const AccountStatus = require('../../../configs/constants/accountStatus');
const AccountType = require('../../../configs/constants/accountType');

const handleAdminGetProperty = async (
  user,
  query,
  page,
  limit = DEFAULT_LIMIT_PAGiNATION,
) => {
  if (isEmpty(user)) {
    throw new Error('Không có quyền thực hiện hành động này');
  }
  const [checkUser, errCheckUser] = await handle(
    User.findOne({
      where: {
        id: user.id,
      },
    }),
  );
  if (errCheckUser) throw errCheckUser;
  if (
    isEmpty(checkUser) ||
    checkUser.status !== AccountStatus.ACTIVE ||
    checkUser.account_type !== AccountType.ADMIN
  ) {
    throw new Error('Không có quyền thực hiện hành động này');
  }

  const queryLimit = Number.isInteger(limit) ? limit : undefined;
  const queryPage = Number.isInteger(page) ? page : undefined;
  const queryObj = {};

  if (query.authorId) {
    queryObj.author_id = query.authorId;
  }

  if (query.keyword) {
    queryObj.title = {
      [Op.like]: `%${query.keyword}%`,
    };
  }

  if (query.district) {
    queryObj.district_id = query.district;
  }

  if (query.propertyType) {
    queryObj.type = query.propertyType;
  }

  const { propertyStatus } = query;
  if (propertyStatus) {
    queryObj.status = propertyStatus;
  }

  const priceQueryObj = getQueryMinMaxFloat(query.maxPrice, query.minPrice);
  const areaQueryObj = getQueryMinMaxInt(query.maxArea, query.minArea);

  if (priceQueryObj) {
    queryObj.price = priceQueryObj;
  }

  if (areaQueryObj) {
    queryObj.area = areaQueryObj;
  }

  const findObj = {
    where: queryObj,
    include: [
      {
        model: PropertyImage,
        as: 'images',
        attributes: ['id', 'image_link'],
      },
      {
        model: District,
        include: Province,
        attributes: ['id', 'name'],
      },
      {
        model: User,
        attributes: ['id', 'email', 'fullname', 'avatar', 'status'],
      },
    ],
    order: [['createdAt', 'DESC']],
  };

  if (queryLimit) {
    findObj.limit = queryLimit;

    if (queryPage) {
      findObj.offset = queryLimit * queryPage;
    }
  }

  const [result, errQuery] = await handle(Property.findAndCountAll(findObj));

  if (errQuery) {
    throw new Error(errQuery.message);
  }

  return {
    properties: result.rows,
    totalCount: result.count,
    page: queryPage,
    limit: queryLimit,
    query,
  };
};

module.exports = handleAdminGetProperty;
