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

const handleAdminRegiserUserAccount = (req, res) => {
  const params = {
    user: req.user,
    ...req.body,
  };
  UserService.handleAdminRegiserUserAccount(params)
    .then((data) =>
      res.status(201).json({
        success: true,
        data: data,
        message: 'Tạo tài khoản thành công',
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
  params.userId = req.user ? req.user.id : null;
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
  UserService.handleGetInfo(req.user ? req.user.id : null)
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

const handleListUser = async (req, res) => {
  const { query } = req;
  const limit = Number.parseInt(query.limit, 10);
  const page = Number.parseInt(query.page, 10);
  query.limit = undefined;
  query.page = undefined;

  UserService.handleListUser(req.user, query, page, limit)
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

const handleAdminUpdateUser = async (req, res) => {
  const params = {
    user: req.user,
    id: req.params.id,
    ...req.body,
  };
  UserService.handleAdminUpdateUser(params)
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

const handleAdminGetUserInfo = async (req, res) => {
  const params = {
    user: req.user,
    id: req.params.id,
  };
  UserService.handleAdminGetUserInfo(params)
    .then((data) =>
      res.status(200).send({
        success: true,
        data: data,
        message: 'Lấy thông tin tài khoản thành công',
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

const handleAddRemoveUserWishList = (req, res) => {
  const params = {
    user: req.user,
    ...req.body,
  };
  
  UserService.handleAddRemoveUserWishList(params)
    .then((data) =>
      res.status(200).send({
        success: true,
        data: data,
        message: 'Cập nhật wishlist thành công',
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

const handleGetWishlist = (req, res) => {
  const params = {
    user: req.user,
    ...req.body,
  };
  
  UserService.handleGetWishlist(params)
    .then((data) =>
      res.status(200).send({
        success: true,
        data: data,
        message: 'Get user wishlist thành công',
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
  handleAddRemoveUserWishList,
  handleGetWishlist,

  //Admin controllers
  handleListUser,
  handleAdminUpdateUser,
  handleAdminGetUserInfo,
  handleAdminRegiserUserAccount,
};
