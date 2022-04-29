/* eslint-disable arrow-body-style */
const { handle, isEmpty } = require('../../../utils/helpers');
const LocationRepo = require('../repository');
const UserRepository = require('../../user/repository');
const AccountStatus = require('../../../configs/constants/accountStatus');
const AccountType = require('../../../configs/constants/accountType');

const addDistrict = async ({ name, province_id, user }) => {
  if (isEmpty(name) && isEmpty(province_id)) {
    throw new Error('Thiếu thông tin tên hoặc id tỉnh');
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

  const [add, errAdd] = await handle(
    LocationRepo.addDistrict({ name, province_id }),
  );

  if (errAdd) throw errAdd;

  return {
    district: add.dataValues,
  };
};

module.exports = addDistrict;
