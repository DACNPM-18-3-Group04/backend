/* eslint-disable arrow-body-style */
const { handle, isEmpty } = require('../../../utils/helpers');
const LocationRepo = require('../repository');
const UserRepository = require('../../user/repository');
const AccountStatus = require('../../../configs/constants/accountStatus');
const AccountType = require('../../../configs/constants/accountType');

const removeDistrict = async ({ id, user }) => {
  if (isEmpty(id)) {
    throw new Error('Thiếu thông tin id');
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

  const [, errRemove] = await handle(LocationRepo.removeDistrict(id));

  if (errRemove) throw errRemove;

  return {};
};

module.exports = removeDistrict;
