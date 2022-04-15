const {
  //
  User: UserModel,
} = require('../../../models');
const { handle, isEmpty, clientLink } = require('../../../utils/helpers');
const { hashPassword } = require('../../../utils/auth');
const AccountTypes = require('../../../configs/constants/accountType');
const AccountStatus = require('../../../configs/constants/accountStatus');
const {
  TEMPLATE_TYPES,
} = require('../../../configs/nodemailer/mail_template.config');
const genOneTimeCode = require('./genOneTimeCode.service');
const MailService = require('../../email/email.service');

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

  // Generate one time used code
  let [ot_code, err_ot_code] = await handle(genOneTimeCode());
  if (err_ot_code) {
    console.log(err_ot_code);
    throw err_ot_code;
  }

  // Send email
  let params_email = {
    type: TEMPLATE_TYPES.USER_ACTIVATION,
    email: params.email,
    content: {
      activation_link: clientLink.genActivationLink(ot_code),
    },
  };
  // eslint-disable-next-line no-unused-vars
  let [send_email, send_email_err] = await handle(
    MailService.sendMail(params_email),
  );
  if (send_email_err) {
    console.log(send_email_err);
    throw send_email_err;
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

module.exports = handleRegister;
