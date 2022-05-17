const UserRepository = require('../../repository');
const AccountStatus = require('../../../../configs/constants/accountStatus');
const AccountType = require('../../../../configs/constants/accountType');
const genOneTimeCode = require('../genOneTimeCode.service');
const MailService = require('../../../email/email.service');
const { handle, isEmpty, clientLink } = require('../../../../utils/helpers');
const {
  TEMPLATE_TYPES,
} = require('../../../../configs/nodemailer/mail_template.config');

async function handleForgotPassword(
  params = {},
  accountType = AccountType.NORMAL,
) {
  if (isEmpty(params.email)) {
    throw new Error('Không có email');
  }

  // Check user exist
  let [user, err_user] = await handle(UserRepository.getByEmail(params.email));
  if (err_user) throw err_user;

  if (
    isEmpty(user) ||
    user.status === AccountStatus.DISABLED ||
    user.account_type !== accountType
  ) {
    throw new Error('Không tồn tại người dùng với email này');
  }

  // Block weird cases
  if (user.status === AccountStatus.INACTIVATED) {
    throw new Error('Tài khoản chưa được kích hoạt');
  }

  const userId = user.id;

  // Generate one time used code
  let [ot_code, err_ot_code] = await handle(genOneTimeCode());
  if (err_ot_code) throw err_ot_code;

  let _params_update = {
    token: ot_code,
  };

  // eslint-disable-next-line no-unused-vars
  let [up_user, up_user_err] = await handle(
    UserRepository.updateById(userId, _params_update),
  );
  if (up_user_err) throw up_user_err;

  // Send email
  let params_reset_email = {
    type: TEMPLATE_TYPES.USER_PASSWORD_RESET,
    email: params.email,
    content: {
      reset_link: clientLink.genResetPasswordLink(userId, ot_code),
    },
  };
  // eslint-disable-next-line no-unused-vars
  let [send_email, send_email_err] = await handle(
    MailService.sendMail(params_reset_email),
  );
  if (send_email_err) throw send_email_err;

  return {};
}

module.exports = handleForgotPassword;
