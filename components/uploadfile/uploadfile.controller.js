let appRoot = require('app-root-path');
const path = require('path');
const fs = require('fs');
const UserService = require('../user/services');

const handleError = (err, res) => {
  res.status(500).json({
    success: false,
    data: [],
    message: 'Lỗi server',
  });
};

const handleUploadfile = (req, res) => {
  const date = new Date();

  const { action } = req.body;

  const userId = req.user.id;
  // const email = req.user.email;
  const extname = path.extname(req.file.originalname).toLowerCase();
  const tempPath = req.file.path;
  const nameFileUpload = `/assets/${date.getTime()}${extname}`;
  const targetPath = path.join(`${appRoot}`, `./public${nameFileUpload}`);
  const allowedExts = ['.png', '.jpg'];

  if (allowedExts.includes(extname)) {
    console.log('datnc', tempPath, 'datnc', targetPath);
    fs.rename(tempPath, targetPath, (err) => {
      if (err) {
        console.error(err);
        return handleError(err, res);
      }

      if (action === 'upload-avatar') {
        const params = { userId: userId, avatar: nameFileUpload };
        UserService.handleUpdateAccount(params)
          .then((data) =>
            res.status(200).send({
              success: true,
              data: data,
              message: 'Cập nhật thông tin tài khoản thành công',
            }),
          )
          .catch((uploadErr) => {
            res.status(400).json({
              success: false,
              data: {},
              message: uploadErr.message,
            });
          });
        // res.status(200).contentType('text/plain').end('File uploaded!');
      }
    });
  } else {
    fs.unlink(tempPath, (err) => {
      if (err) return handleError(err, res);

      res.status(403).json({
        success: false,
        data: {},
        message: `File không hợp lệ (Hợp lệ ${allowedExts.join('/')})`,
      });
    });
  }
};
module.exports = { handleUploadfile };
