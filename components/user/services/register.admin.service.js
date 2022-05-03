const {
  //
  User: UserModel,
} = require('../../../models');
const { handle, isEmpty } = require('../../../utils/helpers');
const { hashPassword } = require('../../../utils/auth');
const AccountTypes = require('../../../configs/constants/accountType');
const AccountStatus = require('../../../configs/constants/accountStatus');
const genOneTimeCode = require('./genOneTimeCode.service');

const handleAdminRegiserUserAccount = async (params) => {
  // Validate user admin permission
  if (isEmpty(params.user)) {
    throw new Error('Không có quyền thực hiện hành động này');
  }

  // Validate password
  if (isEmpty(params.password)) {
    throw new Error('Vui lòng truyền password');
  }

  if (
    !params.password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    )
  ) {
    throw new Error(
      'Mật khẩu tối thiểu 8 ký tự, ít nhất một ký tự viết hoa, một ký tự viết thường, một số và một ký tự đặc biệt',
    );
  }

  // Generate one time used code
  let [ot_code, err_ot_code] = await handle(genOneTimeCode());
  if (err_ot_code) {
    console.log(err_ot_code);
    throw err_ot_code;
  }

  const passwordHash = hashPassword(params.password);

  let _params_new_users = {
    email: params.email,
    password: passwordHash,
    fullname: params.fullname || params.email,
    contact_email: params.email,
    contact_number: params.contact_number || '',
    account_type: AccountTypes.NORMAL,
    status: AccountStatus.INACTIVATED,
    token: ot_code,
  };

  let [new_user, new_user_err] = await handle(
    UserModel.create(_params_new_users),
  );
  if (new_user_err) throw new_user_err;

  // Format output
  _params_new_users.password = undefined;
  _params_new_users.token = undefined;

  return {
    id: new_user.insertId,
    ..._params_new_users,
  };
};

module.exports = handleAdminRegiserUserAccount;
