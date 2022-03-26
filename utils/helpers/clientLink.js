const { client } = require('../../configs/default.config');

function genActivationLink(one_time_code) {
  return `${client.host}/user/activation?activation=${one_time_code}`;
}

module.exports = {
  genActivationLink,
};
