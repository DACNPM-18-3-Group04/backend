const PropertyService = require('./services');

const handleSearchProperty = async (req, res) => {
  const { query } = req;
  const limit = Number.parseInt(query.limit, 10);
  const page = Number.parseInt(query.page, 10);
  query.limit = undefined;
  query.page = undefined;

  PropertyService.handleSearchProperty(query, page, limit)
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
        message: 'Lấy thông tin thành công',
      });
    })
    .catch((err) => {
      console.log(err);
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
