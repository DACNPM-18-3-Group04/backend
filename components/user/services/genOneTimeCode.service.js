const {
  //
  User: UserModel,
} = require('../../../models');
const { handle, isEmpty, genRandomString } = require('../../../utils/helpers');
const {
  MAX_RETRY_GEN_ACTIVATION_CODE,
  ACCOUNT_ACTIVATION_CODE_LENGTH,
} = require('../../../configs/constants/system');

async function genOneTimeCode(retry = 0) {
  if (retry >= MAX_RETRY_GEN_ACTIVATION_CODE) {
    throw new Error('Không tạo được mã dùng một lần');
  }

  const ot_code = genRandomString(ACCOUNT_ACTIVATION_CODE_LENGTH);
  let [user, err_user] = await handle(
    UserModel.findOne({
      where: {
        token: ot_code,
      },
    }),
  );

  if (err_user) {
    throw err_user;
  }

  if (isEmpty(user)) {
    return ot_code;
  }
  return this.genOneTimeCode(retry + 1);
}

module.exports = genOneTimeCode;
