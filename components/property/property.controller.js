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
        success: false,
        data: {},
        message: err.message,
      });
    });
};

const handleCreateProperty = async (req, res) => {
  const params = {
    user: req.user,
    ...req.body,
  };

  PropertyService.handleCreateProperty(params)
    .then((data) => {
      res.status(201).json({
        success: true,
        data: data,
        message: 'Đăng thông tin thành công',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        success: false,
        data: {},
        message: err.message,
      });
    });
};

const PropertyController = {
  handleSearchProperty,
  handleCreateProperty,
};

module.exports = PropertyController;
