const { handle, isEmpty } = require('../../../utils/helpers');
const PropertyImageRepo = require('../../propertyImage/repository');
const PropertyRepo = require('../../property/repository');

const removeImage = require('./remove.service');

const removePropertyImage = async ({ userId, propertyId, imageId }) => {
  // Validation
  if (isEmpty(userId)) {
    throw new Error('Không có user');
  }

  if (isEmpty(propertyId)) {
    throw new Error('Không có id BĐS');
  }

  if (isEmpty(imageId)) {
    throw new Error('Không có id hình ảnh');
  }

  const [property, errProperty] = await handle(
    PropertyRepo.getBasicById(propertyId),
  );
  if (errProperty) throw errProperty;
  if (isEmpty(property)) {
    throw new Error('BĐS không tồn tại');
  }
  if (`${property.author_id}` !== `${userId}`) {
    throw new Error('Không có quyền cập nhật');
  }

  const [image, errImage] = await handle(
    PropertyImageRepo.getById({ id: imageId }),
  );
  if (errImage) throw errImage;
  if (isEmpty(image)) {
    throw new Error('Hình không tồn tại');
  }
  // Validation

  // eslint-disable-next-line no-unused-vars
  const [resRemove, errRemove] = await handle(
    removeImage({ publicId: image.public_id }),
  );
  if (errRemove) {
    throw errRemove;
  }

  // eslint-disable-next-line no-unused-vars
  const [resUpdate, errUpdate] = await handle(
    PropertyImageRepo.remove({ id: imageId }),
  );
  if (errUpdate) {
    throw errUpdate;
  }
  // console.log(resUpdate);
  return {};
};

module.exports = removePropertyImage;
