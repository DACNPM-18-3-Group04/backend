const { hashPassword } = require('../../../utils/auth');
const { isEmpty, handle } = require('../../../utils/helpers');
const UserRepository = require('../repository');
const AccountStatus = require('../../../configs/constants/accountStatus');
const AccountType = require('../../../configs/constants/accountType');
const AuthService = require('../../auth/services');

require('dotenv').config();
const onCallMServiceFail = (err) => {
  console.log(process.env.AUTH_MSERVICE_BLOCK_ON_FAIL);
  if (process.env.AUTH_MSERVICE_BLOCK_ON_FAIL) {
    const errMessage =
      'Lỗi cập nhật trạng thái tài khoản. Vui lòng thử lại sau';
    throw new Error(errMessage);
  }
  console.log(err);
};

const handleAdminUpdateUserAccount = async (params) => {
  // Validate user admin permission
  if (isEmpty(params.user)) {
    throw new Error('Không có quyền thực hiện hành động này');
  }

  const userId = params.user.id;
  const [checkUser, errCheckUser] = await handle(
    UserRepository.getById(userId),
  );

  if (errCheckUser) throw errCheckUser;
  if (
    isEmpty(checkUser) ||
    checkUser.status !== AccountStatus.ACTIVE ||
    checkUser.account_type !== AccountType.ADMIN
  ) {
    throw new Error('Không có quyền thực hiện hành động này');
  }
  // Validate user admin permission

  // Validate updated user info
  const updatedUserId = params.id;
  if (isEmpty(updatedUserId)) {
    throw new Error('Không có userId');
  }

  let [user, checkUpdatedUser] = await handle(
    UserRepository.getById(updatedUserId),
  );
  if (checkUpdatedUser) throw checkUpdatedUser;
  if (isEmpty(user)) {
    throw new Error('Tài khoản không tồn tại');
  }
  // Validate updated user info

  const paramsUpdate = {};

  // If admin reset password
  if (!isEmpty(params.newPassword)) {
    if (
      !params.newPassword.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      )
    ) {
      throw new Error(
        'Mật khẩu tối thiểu 8 ký tự, ít nhất một ký tự viết hoa, một ký tự viết thường, một số và một ký tự đặc biệt',
      );
    }

    paramsUpdate.password = hashPassword(params.newPassword);
  }

  if (params.email) paramsUpdate.email = params.email;
  if (params.fullname) paramsUpdate.fullname = params.fullname;
  if (params.contact_email) paramsUpdate.contact_email = params.contact_email;
  if (params.contact_number)
    paramsUpdate.contact_number = params.contact_number;
  if (params.avatar) paramsUpdate.avatar = params.avatar;

  const newStatus = params.status;
  if (newStatus && AccountStatus.isValid(newStatus)) {
    if (newStatus === AccountStatus.INACTIVATED) {
      const res = await AuthService.handleUnban({ userId });
      if (!res.success) {
        onCallMServiceFail();
      }
    } else {
      const res = await AuthService.handleBan({ userId });
      if (!res.success) {
        onCallMServiceFail();
      }
    }
    paramsUpdate.status = newStatus;
  }
  const newAccountType = params.account_type;
  if (newAccountType && AccountType.isValid(newAccountType)) {
    paramsUpdate.account_type = newAccountType;
  }

  const [updated, errUpdated] = await handle(
    UserRepository.updateById(updatedUserId, paramsUpdate),
  );
  if (errUpdated) {
    throw errUpdated;
  }
  console.log(updated);
  paramsUpdate.password = undefined;

  return {
    id: updatedUserId,
    ...paramsUpdate,
  };
};

module.exports = handleAdminUpdateUserAccount;
