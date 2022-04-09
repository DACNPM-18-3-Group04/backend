// const Sequelize = require('sequelize');

const { Province, District } = require('../models');
const { handle } = require('../../../utils/helpers');

const handleGetAllDistrict = async () => {
  const [districts, errDistricts] = await handle(
    District.findAll({
      include: [
        {
          model: Province,
        },
      ],
    }),
  );

  if (errDistricts) {
    console.log(errDistricts);
    throw new Error('Lỗi lấy thông tin');
  }

  return districts;
};

module.exports = handleGetAllDistrict;
