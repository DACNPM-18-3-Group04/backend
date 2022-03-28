const UserService = require('./services');

const handleRegister = (req, res) => {
  let params = req.body;
  UserService.handleRegister(params)
    .then((data) =>
      res.status(201).json({
        success: true,
        data: data,
        message: 'Đăng ký tài khoản thành công',
      }),
    )
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        success: false,
        data: {},
        message: err.message,
      });
    });
};

const handleActivateAccount = (req, res) => {
  let params = req.body;
  UserService.handleActivateAccount(params)
    .then((data) =>
      res.status(200).send({
        success: true,
        data: data,
        message: 'Kích hoạt tài khoản thành công',
      }),
    )
    .catch((err) => {
      res.status(400).json({
        success: false,
        data: [],
        message: err.message,
      });
    });
};

const handleUpdateAccount = (req, res) => {
  let params = req.body;
  params.userId = req.user?.id;
  UserService.handleUpdateAccount(params)
    .then((data) =>
      res.status(200).send({
        success: true,
        data: data,
        message: 'Cập nhật thông tin tài khoản thành công',
      }),
    )
    .catch((err) => {
      res.status(400).json({
        success: false,
        data: [],
        message: err.message,
      });
    });
};

const handleGetInfo = (req, res) => {
  UserService.handleGetInfo(req.user?.id)
    .then((data) =>
      res.status(200).send({
        success: true,
        data: data,
        message: 'Cập nhật thông tin tài khoản thành công',
      }),
    )
    .catch((err) => {
      res.status(400).json({
        success: false,
        data: [],
        message: err.message,
      });
    });
};

module.exports = {
  handleRegister,
  handleActivateAccount,
  handleUpdateAccount,
  handleGetInfo,
};
