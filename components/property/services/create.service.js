const {
  //
  Property,
  User: UserModel,
} = require('../../../models');
const { handle, isEmpty } = require('../../../utils/helpers');
const AccountStatus = require('../../../configs/constants/accountStatus');
const PropertyType = require('../../../configs/constants/property/propertyType');

const handleCreate = async (params) => {
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

  if (isEmpty(params.title)) {
    throw new Error('Không có tiêu đề');
  }

  if (isEmpty(params.address)) {
    throw new Error('Không có địa chỉ');
  }

  if (isEmpty(params.district_id)) {
    throw new Error('Không có địa chỉ quận');
  }

  if (isEmpty(params.price)) {
    throw new Error('Không có giá bán');
  }

  if (isEmpty(params.area)) {
    throw new Error('Không có diện tích');
  }

  if (params.type) {
    if (![PropertyType.SELL, PropertyType.LENT].includes(params.type)) {
      throw new Error('Loại cho thuê / bán không hợp lệ');
    }
  }

  let paramsNewProperty = {
    title: params.title,
    type: params.type || PropertyType.DEFAULT,
    description: params.description || '',
    address: params.address,
    district_id: params.district_id,
    price: params.price,
    area: params.area,
    author_id: checkUser.id,
  };

  let [newProperty, errNewProperty] = await handle(
    Property.create(paramsNewProperty),
  );
  if (errNewProperty) throw errNewProperty;

  return {
    id: newProperty.insertId,
    ...paramsNewProperty,
  };
};

module.exports = handleCreate;
