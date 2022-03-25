const UserModel = require('../user.model');
const { handle, isEmpty } = require('../../../utils/helpers');
const { hashPassword } = require('../../../utils/auth');
const AccountTypes = require('../../../configs/constants/accountType');

const handleRegister = async (params) => {
  // Validate email
  if (isEmpty(params.email)) {
    throw new Error('Vui lòng truyền email');
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
    throw new Error('Đã tồn tại email');
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

  const passwordHash = hashPassword(params.password);

  let _params_new_users = {
    email: params.email,
    password: passwordHash,
    fullname: params.fullname || params.email,
    contact_email: params.email,
    contact_number: params.contact_number || '',
    account_type: AccountTypes.DEFAULT,
  };

  let [new_user, new_user_err] = await handle(
    UserModel.create(_params_new_users),
  );
  if (new_user_err) throw new_user_err;

  // Format output
  _params_new_users.password = undefined;

  return {
    id: new_user.insertId,
    ..._params_new_users,
  };
};

module.exports = handleRegister;
