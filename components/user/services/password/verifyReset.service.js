const UserRepository = require('../../repository');
const AccountStatus = require('../../../../configs/constants/accountStatus');
const AccountType = require('../../../../configs/constants/accountType');
const { handle, isEmpty } = require('../../../../utils/helpers');

async function handleVerifyResetToken(
  params = {},
  accountType = AccountType.NORMAL,
) {
  if (isEmpty(params.userid)) {
    throw new Error('Không có id người dùng');
  }

  if (isEmpty(params.otcode)) {
    throw new Error('Không có mã dùng một lần');
  }

  let [user, err_user] = await handle(UserRepository.getById(params.userid));
  if (err_user) throw err_user;
  if (
    isEmpty(user) ||
    user.status === AccountStatus.DISABLED ||
    user.account_type !== accountType
  ) {
    throw new Error('Id người dùng không hợp lệ');
  }

  if (user.token !== params.otcode) {
    throw new Error('Mã dùng một lần không hợp lệ');
  }

  return {};
}

module.exports = handleVerifyResetToken;
