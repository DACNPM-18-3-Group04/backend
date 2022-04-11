const PropertyLocationService = require('./services');

const handleGetDistricts = async (req, res) => {
  PropertyLocationService.handleGetAllDistrict()
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
        message: 'Lấy thông tin thành công',
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: true,
        data: {},
        message: err.message,
      });
    });
};

module.exports = {
  handleGetDistricts,
};
