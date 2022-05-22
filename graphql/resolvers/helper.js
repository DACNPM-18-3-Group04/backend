const accountStatus = require('../../configs/constants/accountStatus');
const accountType = require('../../configs/constants/accountType');

const isAdminUser = (user) => {
  if (
    user &&
    user.status === accountStatus.ACTIVE &&
    user.account_type === accountType.ADMIN
  )
    return true;
  return false;
};

module.exports = isAdminUser;
