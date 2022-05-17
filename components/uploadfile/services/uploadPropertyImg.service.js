const path = require('path');
const { handle, isEmpty } = require('../../../utils/helpers');
const uploadImage = require('./upload.service');
const PropertyImageRepo = require('../../propertyImage/repository');
const PropertyRepo = require('../../property/repository');

const uploadPropertyImage = async ({ userId, propertyId, reqFile }) => {
  // Validation
  if (isEmpty(userId)) {
    throw new Error('Không có user');
  }

  if (isEmpty(propertyId)) {
    throw new Error('Không có id BĐS');
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
  // Validation

  const extname = path.extname(reqFile.originalname).toLowerCase();
  const allowedExts = ['.png', '.jpg', '.jpeg'];
  if (!allowedExts.includes(extname)) {
    throw new Error(`File không hợp lệ (Hợp lệ ${allowedExts.join('|')})`);
  }

  let { filename } = reqFile;
  const [resUpload, errUpload] = await handle(uploadImage(filename));
  if (errUpload) {
    throw errUpload;
  }
  const paramsUpdate = {
    propertyId: propertyId,
    publicId: resUpload.public_id,
    link: resUpload.link,
  };

  // eslint-disable-next-line no-unused-vars
  const [resUpdate, errUpdate] = await handle(
    PropertyImageRepo.create(paramsUpdate),
  );
  if (errUpdate) {
    throw errUpdate;
  }
  // console.log(resUpdate);
  return {
    id: resUpdate.dataValues.id,
    image_link: resUpload.link,
  };
};

module.exports = uploadPropertyImage;
