const AuthService = require('./services');

const handleSignIn = async (req, res) => {
  const params = req.body;
  AuthService.handleSignIn(params)
    .then((data) =>
      res.status(201).json({
        success: true,
        data: data,
        message: 'Đăng nhập thành công',
      }),
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        data: {},
        message: err.message,
      }),
    );
};

const handleSignOut = async (req, res) => {
  AuthService.handleSignOut()
    .then((data) => {
      res.status(201).json({
        success: true,
        data: data,
        message: 'Đăng xuất thành công',
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        data: {},
        message: err.message,
      });
    });
};

module.exports = {
  handleSignIn,
  handleSignOut,
};
