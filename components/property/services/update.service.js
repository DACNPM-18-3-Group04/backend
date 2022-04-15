const {
  //
  Property,
  User: UserModel,
} = require('../../../models');
const { handle, isEmpty } = require('../../../utils/helpers');
const AccountStatus = require('../../../configs/constants/accountStatus');
const PropertyType = require('../../../configs/constants/property/propertyType');
const AccountType = require('../../../configs/constants/accountType');
const PropertyStatus = require('../../../configs/constants/property/propertyStatus');

const handleUpdateProperty = async (params) => {
  // Validate user permission
  const { user } = params;
  if (isEmpty(user)) {
    throw new Error('Không có quyền thực hiện hành động này');
  }

  let [checkUser, errCheckUser] = await handle(
    UserModel.findOne({
      where: {
        id: user.id,
      },
    }),
  );
  if (errCheckUser) throw errCheckUser;
  if (isEmpty(checkUser) || checkUser.status !== AccountStatus.ACTIVE) {
    throw new Error('Không có quyền thực hiện hành động này');
  }

  //Check Mandatory field
  if (isEmpty(params.id)) {
    throw new Error('Tin không tồn tại Check Mandatory field');
  }
  if (isEmpty(params.author_id)) {
    throw new Error('Người đăng không hợp lệ');
  }

  //Find Property
  let queryUpdateProperty = {
    where: {
      id: params.id,
      author_id: params.author_id,
    },
  };
  let [checkProperty, errCheckProperty] = await handle(
    Property.findOne(queryUpdateProperty),
  );
  if (errCheckProperty) throw errCheckProperty;
  if (isEmpty(checkProperty)) {
    throw new Error('Tin không tồn tại checkProperty');
  }

  //Only Admin or author can edit the property
  if (
    checkProperty.author_id !== checkUser.id &&
    checkUser.account_type === AccountType.ADMIN
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
      ].includes(params.type)
    ) {
      throw new Error('Loại trạng thái tin đăng không hợp lệ');
    }
  }

  //Create Update Object
  let paramsUpdateProperty = {
    id: params.id,
    title: params.title || checkProperty.title,
    type: params.type || checkProperty.type,
    description: params.description || checkProperty.description,
    price: params.price || checkProperty.price,
    area: params.area || checkProperty.area,
    address: params.address || checkProperty.address,
    district_id: params.district_id || checkProperty.district_id,
    author_id: params.author_id,
    status: params.status || checkProperty.status,
  };

  //Update
  // eslint-disable-next-line no-unused-vars
  let [listUpdatedProperty, errNewProperty] = await handle(
    Property.update(paramsUpdateProperty, queryUpdateProperty),
  );
  if (errNewProperty) throw errNewProperty;

  return {
    id: params.id,
    ...paramsUpdateProperty,
  };
};

module.exports = handleUpdateProperty;
