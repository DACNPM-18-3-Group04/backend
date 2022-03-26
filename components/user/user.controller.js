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
      })
    });
};

const handleActivateAccount = (req, res) => {
  let params = req.body;
  UserService.handleActivateAccount(params)
  .then((data) => res.status(200).send({
    success: true,
    data: data,
    message: 'Kích hoạt tài khoản thành công'
  }))
  .catch(err => {
    res.status(400).json({ 
        success: false, 
        data: [], 
        message: err.message 
    })
  })
}

module.exports = {
  handleRegister,
  handleActivateAccount,
};
