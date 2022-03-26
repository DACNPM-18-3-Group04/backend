const UserModel = require('../user.model');
const { handle, isEmpty } = require('../../../utils/helpers');

async function handleActivateAccount(params) {
  if (isEmpty(params.activation)) {
      throw new Error('Không có mã kích hoạt');
  }

  let [user, err_user] = await handle(
    UserModel.findOne({
      where: {
        token: params.activation,
      },
    })
  );
  if (err_user) throw (err_user);

  if (isEmpty(user) || user.status === 'D') {
      throw new Error(`Mã kích hoạt không hợp lệ (${params.activation})`);
  }

  // Block weird cases
  if (user.status !== 'I') {
      throw new Error('Tài khoản đã được kích hoạt trước đó');
  }

  let _params_update = {
      token: null,  // Consume one time code (token)
      status: 'A',
  }

  const userId = user.id
  let [user_updated, err_user_updated] = await handle(
    UserModel.update(_params_update, {
      where: {
        id: userId,
      }
    })
  );
  if (err_user_updated) throw (err_user_updated);
  
  return {}
}

module.exports = handleActivateAccount;
