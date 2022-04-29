/* eslint-disable arrow-body-style */
const { Province } = require('../../../models');
const { handle, isEmpty } = require('../../../utils/helpers');

const removeProvince = async (id) => {
  const [province, errProvince] = await handle(
    Province.findOne({ where: { id: id } }),
  );
  if (isEmpty(province)) {
    throw new Error('Không tồn tại');
  }
  if (errProvince) throw errProvince;

  return Province.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = removeProvince;
