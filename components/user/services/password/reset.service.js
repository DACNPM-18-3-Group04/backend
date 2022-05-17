const UserRepository = require('../../repository');
const AccountStatus = require('../../../../configs/constants/accountStatus');
const AccountType = require('../../../../configs/constants/accountType');
const { handle, isEmpty } = require('../../../../utils/helpers');
const { hashPassword } = require('../../../../utils/auth');

async function handlePasswordReset(params, accountType = AccountType.NORMAL) {
  if (isEmpty(params.userid)) {
    throw new Error('Không có id người dùng');
  }
  if (isEmpty(params.otcode)) {
    throw new Error('Không có mã dùng một lần');
  }
  if (isEmpty(params.password)) {
    throw new Error('Không có mật khẩu mới');
  }

  if (
    !params.password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    )
  ) {
    throw new Error(
      'Mật khẩu tối thiểu 8 ký tự, ít nhất một ký tự viết hoa' +
        ', một ký tự viết thường, một số và một ký tự đặc biệt(#?!@$%^&*-)',
    );
  }

  let [user, err_user] = await handle(UserRepository.getById(params.userid));
  if (err_user) throw err_user;

  if (
    isEmpty(user) ||
    user.status === AccountStatus.DISABLED ||
    user.account_type !== accountType ||
    user.token !== params.otcode
  ) {
    throw new Error('Mã reset không hợp lệ');
  }

  // Block weird cases
  if (user.status === AccountStatus.INACTIVATED) {
    throw new Error('Tài khoản chưa được kích hoạt');
  }

  const passwordHash = hashPassword(params.password);
  let _params_update = {
    token: null, // Consume one time code (token)
    password: passwordHash,
  };

  const userId = user.id;
  // eslint-disable-next-line no-unused-vars
  let [user_updated, err_user_updated] = await handle(
    UserRepository.updateById(userId, _params_update),
  );
  if (err_user_updated) throw err_user_updated;

  return {};
}

module.exports = handlePasswordReset;
