/* eslint-disable arrow-body-style */
const { District } = require('../../../models');
const { handle, isEmpty } = require('../../../utils/helpers');

const removeDistrict = async (id) => {
  const [district, errDistrict] = await handle(
    District.findOne({ where: { id: id } }),
  );
  if (isEmpty(district)) {
    throw new Error('Không tồn tại');
  }
  if (errDistrict) throw errDistrict;

  return District.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = removeDistrict;
