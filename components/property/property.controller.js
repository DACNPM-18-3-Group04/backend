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

const handleUpdateProperty = async (req, res) => {
  const params = {
    user: req.user,
    ...req.body,
  };

  PropertyService.handleUpdateProperty(params)
    .then((data) => {
      res.status(201).json({
        success: true,
        data: data,
        message: 'Cập nhật thông tin thành công',
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

const handleGetListProperty = async (req, res) => {
  const params = req.query.page;
  PropertyService.handleGetListProperty(params)
    .then((data) =>
      res.status(200).json({
        success: true,
        data: data,
        message: 'Lấy danh sách property thành công',
      }),
    )
    .catch((err) =>
      res.status(404).json({
        success: false,
        data: {},
        message: err.message,
      }),
    );
};

const handleGetPropertyById = async (req, res) => {
  PropertyService.handleGetPropertyById(req.query)
    .then((data) =>
      res.status(200).json({
        success: true,
        data: data,
        message: 'Lấy property thành công',
      }),
    )
    .catch((err) =>
      res.status(404).json({
        success: false,
        data: {},
        message: err.message,
      }),
    );
};

const handleAdminGetPropertyById = async (req, res) => {
  const params = {
    user: req.user,
    id: req.params.id,
  };
  PropertyService.handleAdminGetPropertyById(params)
    .then((data) =>
      res.status(200).json({
        success: true,
        data: data,
        message: 'Lấy BĐS thành công',
      }),
    )
    .catch((err) =>
      res.status(404).json({
        success: false,
        data: {},
        message: err.message,
      }),
    );
};

const PropertyController = {
  handleSearchProperty,
  handleCreateProperty,
  handleUpdateProperty,
  handleGetListProperty,
  handleGetPropertyById,
  Admin: {
    handleGetPropertyById: handleAdminGetPropertyById,
  },
};

module.exports = PropertyController;
