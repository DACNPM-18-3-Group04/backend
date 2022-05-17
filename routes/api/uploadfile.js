const express = require('express');
const router = express.Router();
const multer = require('multer');

const { auth } = require('../../components/auth/auth.middleware');
const {
  temp_file_path: tempFilePath,
} = require('../../configs/default.config');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempFilePath);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const {
  // handleUploadfile,
  handleUploadAvatar,
  handleUploadPropertyImage,
  handleRemovePropertyImage,
} = require('../../components/uploadfile/uploadfile.controller');

// router.post('/file', auth, upload.single('file'), handleUploadfile);

router.post('/avatar', auth, upload.single('image'), handleUploadAvatar);

router.post(
  '/property-image',
  auth,
  upload.single('image'),
  handleUploadPropertyImage,
);

router.post('/property-image/remove', auth, handleRemovePropertyImage);

module.exports = router;
