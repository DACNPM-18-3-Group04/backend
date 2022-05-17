/* eslint-disable arrow-body-style */
const { PropertyImage } = require('../../../models');
const { handle, isEmpty } = require('../../../utils/helpers');

const remove = async ({ id }) => {
  const [image, errImage] = await handle(
    PropertyImage.findOne({ where: { id: id } }),
  );
  if (isEmpty(image)) {
    throw new Error('Hình không tồn tại');
  }
  if (errImage) throw errImage;

  return PropertyImage.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = remove;
