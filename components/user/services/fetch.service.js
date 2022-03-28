const { isEmpty, handle } = require('../../../utils/helpers');
const UserModel = require('../user.model');

const handleGetInfo = async (userId) => {
  let [user, chk_email_err] = await handle(
    UserModel.findOne({
      where: {
        id: userId,
      },
    }),
  );
  if (chk_email_err) throw chk_email_err;

  if (isEmpty(user)) {
    throw new Error('Tài khoản không tồn tại');
  }

  const { email, account_type } = user;
  return { email, account_type };
};

module.exports = handleGetInfo;
