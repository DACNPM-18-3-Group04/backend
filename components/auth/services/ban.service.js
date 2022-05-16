const AuthMService = require('./mservice');
const { handle } = require('../../../utils/helpers');

const handleBan = async ({ userId = '' }) => {
  const [res, errRes] = await handle(AuthMService.banUser(userId));

  if (errRes) {
    throw errRes;
  }

  if (!res.success) {
    throw new Error('Khóa tài khoản không thành công');
  }

  return {
    success: true,
  };
};

module.exports = handleBan;
