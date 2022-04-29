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

const handleGetProvinces = async (req, res) => {
  PropertyLocationService.handleGetAllProvince()
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

const handleAddProvince = async (req, res) => {
  const params = {
    user: req.user,
    ...req.body,
  };
  PropertyLocationService.addProvince(params)
    .then((data) => {
      res.status(201).json({
        success: true,
        data: data,
        message: 'Tạo thành công',
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: true,
        data: {},
        message: err.message,
      });
    });
};

const handleUpdateProvince = async (req, res) => {
  const params = {
    user: req.user,
    id: req.params.id,
    ...req.body,
  };
  PropertyLocationService.updateProvince(params)
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
        message: 'Cập nhật thành công',
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: true,
        data: {},
        message: err.message,
      });
    });
};

const handleRemoveProvince = async (req, res) => {
  const params = {
    user: req.user,
    id: req.params.id,
  };
  PropertyLocationService.removeProvince(params)
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
        message: 'Vô hiệu thành công',
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: true,
        data: {},
        message: err.message,
      });
    });
};

const handleAddDistrict = async (req, res) => {
  const params = {
    user: req.user,
    ...req.body,
  };
  PropertyLocationService.addDistrict(params)
    .then((data) => {
      res.status(201).json({
        success: true,
        data: data,
        message: 'Tạo thành công',
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: true,
        data: {},
        message: err.message,
      });
    });
};

const handleUpdateDistrict = async (req, res) => {
  const params = {
    user: req.user,
    id: req.params.id,
    ...req.body,
  };
  PropertyLocationService.updateDistrict(params)
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
        message: 'Cập nhật thành công',
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: true,
        data: {},
        message: err.message,
      });
    });
};

const handleRemoveDistrict = async (req, res) => {
  const params = {
    user: req.user,
    id: req.params.id,
  };
  PropertyLocationService.removeDistrict(params)
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
        message: 'Vô hiệu thành công',
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: true,
        data: {},
        message: err.message,
      });
    });
};

module.exports = {
  handleGetDistricts,
  handleGetProvinces,

  handleAddProvince,
  handleAddDistrict,

  handleUpdateDistrict,
  handleUpdateProvince,

  handleRemoveDistrict,
  handleRemoveProvince,
};
