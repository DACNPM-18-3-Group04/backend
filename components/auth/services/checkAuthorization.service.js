const AuthMService = require('./mservice');
const { handle } = require('../../../utils/helpers');

const checkAuthorization = async ({ userId = '' }) => {
  const [res, errRes] = await handle(AuthMService.isAuthorized(userId));

  if (errRes) {
    throw errRes;
  }

  return {
    authorized: res.authorized,
  };
};

module.exports = checkAuthorization;
