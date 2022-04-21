const path = require('path');
const { handle, isEmpty } = require('../../../utils/helpers');
const uploadImage = require('./upload.service');
const UserService = require('../../user/services');

const uploadAvatar = async (userId, reqFile) => {
  if (isEmpty(userId)) {
    throw new Error('Không có user');
  }

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
  const avatarLink = resUpload.link;
  const paramsUpdate = {
    userId: userId,
    avatar: avatarLink,
  };

  // eslint-disable-next-line no-unused-vars
  const [resUpdate, errUpdate] = await handle(
    UserService.handleUpdateAccount(paramsUpdate),
  );
  if (errUpdate) {
    throw errUpdate;
  }
  return {
    avatar: avatarLink,
  };
};

module.exports = uploadAvatar;
