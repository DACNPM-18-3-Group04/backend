/* eslint-disable arrow-body-style */
const { handle, isEmpty } = require('../../../utils/helpers');
const LocationRepo = require('../repository');
const UserRepository = require('../../user/repository');
const AccountStatus = require('../../../configs/constants/accountStatus');
const AccountType = require('../../../configs/constants/accountType');

const addProvince = async ({ name, user }) => {
  if (isEmpty(name)) {
    throw new Error('Không có tên tỉnh / thành phố');
  }

  // Validate user admin permission
  if (isEmpty(user)) {
    throw new Error('Không có quyền thực hiện hành động này');
  }

  const userId = user.id;
  const [checkUser, errCheckUser] = await handle(
    UserRepository.getById(userId),
  );

  if (errCheckUser) throw errCheckUser;
  if (
    isEmpty(checkUser) ||
    checkUser.status !== AccountStatus.ACTIVE ||
    checkUser.account_type !== AccountType.ADMIN
  ) {
    throw new Error('Không có quyền thực hiện hành động này');
  }
  // Validate user admin permission

  const [add, errAdd] = await handle(LocationRepo.addProvince({ name }));

  if (errAdd) throw errAdd;

  return {
    province: add.dataValues,
  };
};

module.exports = addProvince;
