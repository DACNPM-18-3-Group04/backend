const { Op } = require('sequelize');
const {
  //
  User,
} = require('../../../models');

const { handle, isEmpty } = require('../../../utils/helpers');
const {
  DEFAULT_LIMIT_PAGiNATION,
} = require('../../../configs/constants/system');
const AccountStatus = require('../../../configs/constants/accountStatus');
const AccountType = require('../../../configs/constants/accountType');

const handleListUser = async (
  user,
  query,
  page,
  limit = DEFAULT_LIMIT_PAGiNATION,
) => {
  // Validate user permission
  if (isEmpty(user)) {
    throw new Error('Không có quyền thực hiện hành động này');
  }

  let [checkUser, errCheckUser] = await handle(
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

  if (query.keyword) {
    queryObj.fullname = {
      [Op.like]: `%${query.keyword}%`,
    };
  }

  // console.log(queryObj);
  const findObj = {
    where: queryObj,
    attributes: { exclude: ['password'] },
    order: [['createdAt', 'DESC']],
  };

  if (queryLimit) {
    findObj.limit = queryLimit;

    if (queryPage) {
      findObj.offset = queryLimit * queryPage;
    }
  }

  const [{ count, rows }, errQuery] = await handle(
    User.findAndCountAll(findObj),
  );

  if (errQuery) {
    console.log(errQuery);
    throw new Error(errQuery.message);
  }

  // console.log(queryPage);
  // console.log(queryLimit);

  return {
    users: rows,
    totalCount: count,
    page: queryPage,
    limit: queryLimit,
    query,
  };
};

module.exports = handleListUser;
