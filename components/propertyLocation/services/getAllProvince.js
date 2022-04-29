const LocationRepo = require('../repository');
const { handle } = require('../../../utils/helpers');

const handleGetAllProvince = async () => {
  const [locations, errLocations] = await handle(LocationRepo.getAllLocation());

  if (errLocations) {
    throw new Error('Lỗi lấy thông tin');
  }

  return { provinces: locations };
};

module.exports = handleGetAllProvince;
