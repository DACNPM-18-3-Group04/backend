const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const {
  temp_file_path: tempFilePath,
} = require('../../../configs/default.config');
const { handle } = require('../../../utils/helpers');

const uploadImage = async (fileName) => {
  const filePath = path.join(tempFilePath, fileName);

  let [res, err] = await handle(
    cloudinary.uploader.upload(filePath, {
      public_id: fileName,
      folder: 'images',
      unique_filename: false,
      overwrite: true,
    }),
  );
  if (err) throw err;
  fs.unlinkSync(filePath);
  return {
    link: res.secure_url,
  };
};

module.exports = uploadImage;
