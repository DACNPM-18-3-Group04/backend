const { Op } = require('sequelize');
const Property = require('../property.model');
const { handle } = require('../../../utils/helpers');
const {
  DEFAULT_LIMIT_PAGiNATION,
} = require('../../../configs/constants/system');
const PropertyStatus = require('../../../configs/constants/property/propertyStatus');
const { getQueryMinMaxFloat, getQueryMinMaxInt } = require('./helpers');
const { District, Province } = require('../../propertyLocation/models');
const User = require('../../user/user.model');

const handleSearchProperty = async (
  query,
  page,
  limit = DEFAULT_LIMIT_PAGiNATION,
) => {
  // Really simple SQL query
  // Need refactoring later, requiring changes to model structure
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

  const priceQueryObj = getQueryMinMaxFloat(query.maxPrice, query.minPrice);
  const areaQueryObj = getQueryMinMaxInt(query.maxArea, query.minArea);

  if (priceQueryObj) {
    queryObj.price = priceQueryObj;
  }

  if (areaQueryObj) {
    queryObj.area = areaQueryObj;
  }

  queryObj.status = query.propertyStatus || PropertyStatus.ACTIVE;

  // console.log(queryObj);
  const findObj = {
    where: queryObj,
    include: [
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

  const [{ count, rows }, errQuery] = await handle(
    Property.findAndCountAll(findObj),
  );

  if (errQuery) {
    console.log(errQuery);
    throw new Error(errQuery.message);
  }

  // console.log(queryPage);
  // console.log(queryLimit);

  return {
    properties: rows,
    totalCount: count,
    page: queryPage,
    limit: queryLimit,
    query,
  };
};

module.exports = handleSearchProperty;
