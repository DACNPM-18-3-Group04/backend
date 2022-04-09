const PropertyService = require('./services');

const handleSearchProperty = async (req, res) => {
  const { query } = req;
  const { limit } = query;
  const { page } = query;
  query.limit = undefined;
  query.page = undefined;

  PropertyService.handleSearchProperty(query, limit, page)
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

const PropertyController = {
  handleSearchProperty,
};

module.exports = PropertyController;
