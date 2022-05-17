const uploadImage = require('./upload.service');
const uploadAvatar = require('./uploadAvatar.service');
const uploadPropertyImage = require('./uploadPropertyImg.service');
const removePropertyImage = require('./removePropertyImg.service');

const UploadService = {
  uploadAvatar,
  uploadImage,
  uploadPropertyImage,
  removePropertyImage,
};

module.exports = UploadService;
