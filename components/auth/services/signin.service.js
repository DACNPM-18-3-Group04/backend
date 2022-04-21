const jwt = require('jsonwebtoken');
const {
  //
  User: UserModel,
} = require('../../../models');
const { handle, isEmpty } = require('../../../utils/helpers');
const { matchPasswordHash } = require('../../../utils/auth');
const { jwtOptions } = require('../../../configs/passport');
const AccountStatus = require('../../../configs/constants/accountStatus');
const AccountType = require('../../../configs/constants/accountType');

const handleSignIn = async (params) => {
  // Validate email
  if (isEmpty(params.email)) {
    throw new Error('Vui lòng truyền email');
  }

  // Validate password
  if (isEmpty(params.password)) {
    throw new Error('Vui lòng truyền password');
  }

  let account_type = params.account_type || AccountType.NORMAL;

  if (
    !params.password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    )
  ) {
    throw new Error(
      'Mật khẩu tối thiểu 8 ký tự, ít nhất một ký tự viết hoa, một ký tự viết thường, một số và một ký tự đặc biệt',
    );
  }

  // Validate account
  let [user, chk_email_err] = await handle(
    UserModel.findOne({
      where: {
        email: params.email,
        account_type: account_type,
      },
    }),
  );
  if (chk_email_err) throw chk_email_err;

  if (isEmpty(user)) {
    throw new Error('Tài khoản không tồn tại');
  }

  // Check active user
  if (user.status === AccountStatus.INACTIVATED) {
    throw new Error('Tải khoản chưa được kích hoạt');
  }

  if (user.status === AccountStatus.DISABLED) {
    throw new Error('Tải khoản đã bị khóa');
  }

  if (!matchPasswordHash(params.password, user.password)) {
    throw new Error('Mật khẩu không đúng');
  }

  let payload = {
    id: user.id,
    email: user.email,
    account_type: user.account_type,
    status: user.status,
  };
  let token = jwt.sign(payload, jwtOptions.secretOrKey);

  // Format output
  user.password = undefined;
  user.token = undefined;

  return {
    user: user,
    access_token: token,
  };
};

module.exports = handleSignIn;
