const AuthMService = require('./mservice');
const { handle } = require('../../../utils/helpers');

const handleUnban = async ({ userId = '' }) => {
  const [res, errRes] = await handle(AuthMService.unbanUser(userId));

  if (errRes) {
    throw errRes;
  }

  if (!res.success) {
    throw new Error('Hủy khóa tài khoản không thành công');
  }

  return {
    success: true,
  };
};

module.exports = handleUnban;
