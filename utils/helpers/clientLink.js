const { client } = require('../../configs/default.config');

function genActivationLink(one_time_code) {
  return `${client.host}/user/activation?activation=${one_time_code}`;
}

function genResetPasswordLink(userid, one_time_code) {
  return `${client.host}/password/reset?id=${userid}&reset=${one_time_code}`;
}

module.exports = {
  genActivationLink,
  genResetPasswordLink,
};
