const { isEmpty, handle } = require('../../../utils/helpers');
const UserRepository = require('../repository');
const AccountStatus = require('../../../configs/constants/accountStatus');
const AccountType = require('../../../configs/constants/accountType');

const handleAdminGetUserInfo = async (params) => {
  // Validate user admin permission
  if (isEmpty(params.user)) {
    throw new Error('Không có quyền thực hiện hành động này');
  }

  const adminUserId = params.user.id;
  const [checkUser, errCheckAdmin] = await handle(
    UserRepository.getById(adminUserId),
  );

  if (errCheckAdmin) throw errCheckAdmin;
  console.log(checkUser);
  if (
    isEmpty(checkUser) ||
    checkUser.status !== AccountStatus.ACTIVE ||
    checkUser.account_type !== AccountType.ADMIN
  ) {
    throw new Error('Không có quyền thực hiện hành động này');
  }
  // Validate user admin permission

  // Validate updated user info
  const userId = params.id;
  if (isEmpty(userId)) {
    throw new Error('Không có userId');
  }

  let [userInfo, errUserInfo] = await handle(UserRepository.getById(userId));
  if (errUserInfo) throw errUserInfo;
  if (isEmpty(userInfo)) {
    throw new Error('Tài khoản không tồn tại');
  }
  // Validate updated user info

  // Filter info
  userInfo.token = undefined;
  userInfo.password = undefined;

  return {
    userId: userId,
    user: userInfo,
  };
};

module.exports = handleAdminGetUserInfo;
