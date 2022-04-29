/* eslint-disable no-throw-literal */
/* eslint-disable no-plusplus */
const { isEmpty, handle } = require('../../../utils/helpers');
const PropertyRepository = require('../repository');
const UserRepository = require('../../user/repository');

const AccountStatus = require('../../../configs/constants/accountStatus');
const AccountType = require('../../../configs/constants/accountType');

const handleAdminGetById = async ({ id, user }) => {
  if (isEmpty(id)) {
    throw new Error('Không có id bất động sản');
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

  const [property, errProperty] = await handle(PropertyRepository.getById(id));

  if (errProperty) {
    throw errProperty;
  }

  if (isEmpty(property)) {
    throw new Error('Không tồn tại bất động sản');
  }

  return { property };
};

module.exports = handleAdminGetById;
