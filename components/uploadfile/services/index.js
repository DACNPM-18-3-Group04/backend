const uploadImage = require('./upload.service');
const uploadAvatar = require('./uploadAvatar.service');

const UploadService = {
  uploadAvatar,
  uploadImage,
};

module.exports = UploadService;
