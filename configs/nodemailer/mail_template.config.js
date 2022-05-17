const { isEmpty } = require('../../utils/helpers');

const config = require('../default.config');
const { username } = config.smtp_mail;

const USER_ACTIVATION = 1;
const USER_PASSWORD_RESET = 2;
const TEMPLATE_TYPES = {
  USER_ACTIVATION,
  USER_PASSWORD_RESET,
};

// Corresponding template = TEMPLATE[TEMPLATE_TYPE - 1]
const TEMPLATES = [
  {
    template: 'user_activation',
    subject: 'KÍCH HOẠT TÀI KHOẢN | WEB BĐS',
  },
  {
    template: 'user_password_reset',
    subject: 'RESET MẬT KHẨU | WEB BĐS',
  },
];

const hbsOptions = {
  viewEngine: {
    layoutsDir: `${__dirname}/../../mail_template/layouts`,
    extname: '.hbs',
  },
  extName: '.hbs',
  viewPath: 'mail_template', //mail_template
};

// HELPER FUNCTIONS
function isValidMailContent(type, content) {
  switch (type) {
    case USER_ACTIVATION: //ACCOUNT ACTIVATION EMAIL
      return !isEmpty(content.activation_link);
    case USER_PASSWORD_RESET: //ACCOUNT FORGOT PASSWORD EMAIL
      return !isEmpty(content.reset_link);
    default:
      return false;
  }
}

function getMailInfomation(params) {
  return {
    from: username,
    to: params.email,
    subject: TEMPLATES[params.type - 1].subject,
    template: TEMPLATES[params.type - 1].template,
    context: params.content,
  };
}
// HELPER FUNCTIONS

module.exports = {
  TEMPLATE_TYPES,
  TEMPLATES,
  hbsOptions,
  isValidMailContent,
  getMailInfomation,
};
