const express = require('express');
const router = express.Router();
const multer = require('multer');
const appRoot = require('app-root-path');
const path = require('path');
const { auth } = require('../../components/auth/auth.middleware');

const upload = multer({
  dest: path.join(`${appRoot}`, './public/tempt'),
});

const {
  handleUploadfile,
} = require('../../components/uploadfile/uploadfile.controller');

router.post('/uploadfile', auth, upload.single('file'), handleUploadfile);

module.exports = router;
