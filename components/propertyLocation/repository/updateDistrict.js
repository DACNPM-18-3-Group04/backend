/* eslint-disable arrow-body-style */
const { District, Province } = require('../../../models');
const { handle, isEmpty } = require('../../../utils/helpers');

const updateDistrict = async (id, paramsUpdate = {}) => {
  const { province_id } = paramsUpdate;

  const [district, errDistrict] = await handle(
    District.findOne({ where: { id: id } }),
  );
  if (isEmpty(district)) {
    throw new Error('Không tồn tại');
  }
  if (errDistrict) throw errDistrict;

  if (!province_id) {
    return District.update(paramsUpdate, {
      where: {
        id: id,
      },
    });
  }

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

  return District.update(paramsUpdate, {
    where: {
      id: id,
    },
  });
};

module.exports = updateDistrict;
