const path = require('path');
const fs = require('fs');
const uploader = require('./uploader/cloudinary');

const {
  temp_file_path: tempFilePath,
} = require('../../../configs/default.config');
const { handle } = require('../../../utils/helpers');

const uploadImage = async (fileName) => {
  const filePath = path.join(tempFilePath, fileName);

  let [res, err] = await handle(
    uploader.upload(filePath, {
      public_id: fileName,
      folder: 'images',
      unique_filename: false,
      overwrite: true,
    }),
  );
  // console.log(res);
  if (err) throw err;
  fs.unlinkSync(filePath);
  return {
    link: res.secure_url,
    public_id: res.public_id,
  };
};

module.exports = uploadImage;
