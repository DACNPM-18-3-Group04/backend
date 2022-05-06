const {
  //
  User: UserModel,
} = require('../../../models');
const { handle, isEmpty } = require('../../../utils/helpers');
const { hashPassword } = require('../../../utils/auth');
const UserRepository = require('../repository');
const AccountTypes = require('../../../configs/constants/accountType');
const AccountStatus = require('../../../configs/constants/accountStatus');

const handleAdminRegiserUserAccount = async (params) => {
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
    checkUser.account_type !== AccountTypes.ADMIN
  ) {
    throw new Error('Không có quyền thực hiện hành động này');
  }
  // Validate user admin permission

  // Validate email/username
  if (isEmpty(params.email)) {
    throw new Error('Vui lòng truyền email/username');
  }

  let [chk_email, chk_email_err] = await handle(
    UserModel.findOne({
      where: {
        email: params.email,
      },
    }),
  );
  if (chk_email_err) throw chk_email_err;

  if (!isEmpty(chk_email)) {
    throw new Error('Đã tồn tại email/username');
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

  // Validate status
  if (!isEmpty(params.account_type)) {
    if (!AccountTypes.isValid(params.account_type)) {
      throw new Error('Loại tài khoản không hợp lệ');
    }
  }

  const passwordHash = hashPassword(params.password);

  let _params_new_users = {
    email: params.email,
    password: passwordHash,
    fullname: params.fullname || params.email,
    contact_email: params.email,
    contact_number: params.contact_number || '',
    account_type: params.account_type || AccountTypes.NORMAL,
    status: AccountStatus.ACTIVE,
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
