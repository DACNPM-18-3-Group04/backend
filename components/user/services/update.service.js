const { matchPasswordHash, hashPassword } = require('../../../utils/auth');
const { isEmpty, handle } = require('../../../utils/helpers');
const {
  //
  User: UserModel,
} = require('../../../models');

const handleUpdateUserAccount = async (params) => {
  let [user, chk_email_err] = await handle(
    UserModel.findOne({
      where: {
        id: params.userId,
      },
    }),
  );
  if (chk_email_err) throw chk_email_err;

  if (isEmpty(user)) {
    throw new Error('Tài khoản không tồn tại');
  }

  // check if user was changing new password
  if (!isEmpty(params.password) && !isEmpty(params.newPassword)) {
    if (
      !params.newPassword.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      )
    ) {
      throw new Error(
        'Mật khẩu tối thiểu 8 ký tự, ít nhất một ký tự viết hoa, một ký tự viết thường, một số và một ký tự đặc biệt',
      );
    }
    if (!matchPasswordHash(params.password, user.password)) {
      throw new Error('Mật khẩu không đúng');
    }

    user.password = hashPassword(params.newPassword);
  }

  if (params.email) user.email = params.email;
  if (params.fullname) user.fullname = params.fullname;
  if (params.contact_email) user.contact_email = params.contact_email;
  if (params.contact_number) user.contact_number = params.contact_number;
  if (params.avatar) user.avatar = params.avatar;

  await user.save();
  await user.reload();
  user.password = undefined;

  return {
    email: user.email,
    fullname: user.fullname,
    contact_email: user.contact_email,
    contact_number: user.contact_number,
    avatar: user.avatar,
  };
};

module.exports = handleUpdateUserAccount;
