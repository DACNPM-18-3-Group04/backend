const { isEmpty } = require('../../utils/helpers');

const config = require('../default.config');
const { username } = config.smtp_mail;


const USER_ACTIVATION = 1;
const TEMPLATE_TYPES = [
  USER_ACTIVATION
]

// Corresponding template = TEMPLATE[TEMPLATE_TYPE - 1]
const TEMPLATES = [
  {
    template: 'user_activation',
    subject: 'KÍCH HOẠT TÀI KHOẢN | WEB BĐS',
  },
];

const hbsOptions = {
  viewEngine: {
    layoutsDir: __dirname + '/../../mail_template/layouts',
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
    default:
      return false;
  }
}

function getMailInfomation(params) {
  return {
    from: username,
    to: params.email,
    subject: TEMPLATE[params.type - 1].subject,
    template: TEMPLATE[params.type - 1].template,
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
}
