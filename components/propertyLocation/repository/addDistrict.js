/* eslint-disable arrow-body-style */
const { District, Province } = require('../../../models');
const { handle, isEmpty } = require('../../../utils/helpers');

const addDistrict = async (paramsAdd) => {
  const { province_id } = paramsAdd;

  const [province, errProvince] = await handle(
    Province.findOne({
      where: {
        id: province_id,
      },
    }),
  );

  if (errProvince) throw errProvince;
  if (isEmpty(province)) {
    throw new Error(`Tỉnh / Thành phố không tồn tại (id:${province_id})`);
  }

  return District.create(paramsAdd);
};

module.exports = addDistrict;
