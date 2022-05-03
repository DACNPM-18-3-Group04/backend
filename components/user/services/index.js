const handleRegister = require('./register.service');
const handleActivateAccount = require('./activate.service');
const handleUpdateAccount = require('./update.service');
const handleGetInfo = require('./fetch.service');

// Admin services
const handleListUser = require('./list.admin.service');
const handleAdminUpdateUser = require('./update.admin.service');
const handleAdminGetUserInfo = require('./get.admin.service');
const handleAdminRegiserUserAccount = require('./register.admin.service');

module.exports = {
  handleRegister,
  handleActivateAccount,
  handleUpdateAccount,
  handleGetInfo,

  // Admin services
  handleListUser,
  handleAdminUpdateUser,
  handleAdminGetUserInfo,
  handleAdminRegiserUserAccount,
};
