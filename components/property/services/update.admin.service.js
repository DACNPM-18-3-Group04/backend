const UserRepository = require('../../user/repository');
const PropertyRepository = require('../repository');

const { handle, isEmpty } = require('../../../utils/helpers');
const AccountStatus = require('../../../configs/constants/accountStatus');
const PropertyType = require('../../../configs/constants/property/propertyType');
const AccountType = require('../../../configs/constants/accountType');
const PropertyStatus = require('../../../configs/constants/property/propertyStatus');

const handleAdminUpdateProperty = async (params) => {
  // Validate user permission
  const { user } = params;
  if (isEmpty(user)) {
    throw new Error('Không có quyền thực hiện hành động này');
  }

  let [checkUser, errCheckUser] = await handle(UserRepository.getById(user.id));
  if (errCheckUser) throw errCheckUser;
  if (isEmpty(checkUser) || checkUser.status !== AccountStatus.ACTIVE) {
    throw new Error('Không có quyền thực hiện hành động này');
  }

  //Check Mandatory field
  if (isEmpty(params.id)) {
    throw new Error('Không có id tin bất động sản');
  }

  let [checkProperty, errCheckProperty] = await handle(
    PropertyRepository.getById(params.id),
  );
  if (errCheckProperty) throw errCheckProperty;
  if (isEmpty(checkProperty)) {
    throw new Error('Không tồn tại tin');
  }

  //Only Admin or author can edit the property
  if (
    checkProperty.author_id !== checkUser.id &&
    checkUser.account_type !== AccountType.ADMIN
  ) {
    throw new Error('Không có quyền thực hiện hành động này');
  }
  //Only Admin can edit STOP_SELL Property
  if (
    checkProperty.status === PropertyStatus.STOP_SELL &&
    checkUser.account_type !== AccountType.ADMIN
  ) {
    throw new Error('Không có quyền thực hiện hành động này');
  }

  //Validate type
  if (params.type) {
    if (![PropertyType.SELL, PropertyType.LENT].includes(params.type)) {
      throw new Error('Loại cho thuê / bán không hợp lệ');
    }
  }

  //Validate status
  if (params.status) {
    if (
      ![
        PropertyStatus.ACTIVE,
        PropertyStatus.DISABLED,
        PropertyStatus.STOP_SELL,
      ].includes(params.status)
    ) {
      throw new Error('Loại trạng thái tin đăng không hợp lệ');
    }
  }

  //Create Update Object
  let paramsUpdateProperty = {
    title: params.title || checkProperty.title,
    type: params.type || checkProperty.type,
    description: params.description || checkProperty.description,
    price: params.price || checkProperty.price,
    area: params.area || checkProperty.area,
    address: params.address || checkProperty.address,
    district_id: params.district_id || checkProperty.district_id,
    status: params.status || checkProperty.status,
  };

  //Update
  // eslint-disable-next-line no-unused-vars
  let [updatedProperty, errUpdateProperty] = await handle(
    PropertyRepository.updateById(params.id, paramsUpdateProperty),
  );
  if (errUpdateProperty) throw errUpdateProperty;

  return {
    id: params.id,
    ...paramsUpdateProperty,
  };
};

module.exports = handleAdminUpdateProperty;
