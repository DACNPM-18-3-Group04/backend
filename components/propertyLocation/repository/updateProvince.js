/* eslint-disable arrow-body-style */
const { Province } = require('../../../models');
const { handle, isEmpty } = require('../../../utils/helpers');

const updateProvince = async (id, paramsUpdate) => {
  const [province, errProvince] = await handle(
    Province.findOne({ where: { id: id } }),
  );
  if (isEmpty(province)) {
    throw new Error('Không tồn tại');
  }
  if (errProvince) throw errProvince;

  return Province.update(paramsUpdate, {
    where: {
      id: id,
    },
  });
};

module.exports = updateProvince;
