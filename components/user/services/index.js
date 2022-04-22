const handleRegister = require('./register.service');
const handleActivateAccount = require('./activate.service');
const handleUpdateAccount = require('./update.service');
const handleGetInfo = require('./fetch.service');
const handleListUser = require('./list.admin.service');

module.exports = {
  handleRegister,
  handleActivateAccount,
  handleUpdateAccount,
  handleGetInfo,
  handleListUser,
};
