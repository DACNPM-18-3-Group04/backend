const uploadImage = require('./upload.service');
const uploadAvatar = require('./uploadAvatar.service');
const uploadPropertyImage = require('./uploadPropertyImg.service');

const UploadService = {
  uploadAvatar,
  uploadImage,
  uploadPropertyImage,
};

module.exports = UploadService;
