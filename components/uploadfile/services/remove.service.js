const uploader = require('./uploader/cloudinary');
const { handle } = require('../../../utils/helpers');

const removeImage = async ({ publicId = '' }) => {
  let [res, err] = await handle(uploader.destroy(publicId));
  if (err) throw err;
  console.log(res);
  return {};
};

module.exports = removeImage;
