const handleRegister = require('./register.service');
const handleActivateAccount = require('./activate.service');
const handleUpdateAccount = require('./update.service');
const handleGetInfo = require('./fetch.service');
const handleAddRemoveUserWishList = require('./addremovewishlist.service');
const handleGetWishlist = require('./getwishlist.service');

// Admin services
const handleListUser = require('./list.admin.service');
const handleAdminUpdateUser = require('./update.admin.service');
const handleAdminGetUserInfo = require('./get.admin.service');

module.exports = {
  handleRegister,
  handleActivateAccount,
  handleUpdateAccount,
  handleGetInfo,
  handleAddRemoveUserWishList,
  handleGetWishlist,

  // Admin services
  handleListUser,
  handleAdminUpdateUser,
  handleAdminGetUserInfo,
};
