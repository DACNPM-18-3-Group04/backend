const ContactServices = require('./services');

const handleSendContact = (req, res) => {
  const params = req.body;
  const { id } = req.user;
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  ContactServices.handleCreateContact({ ...params, userID: id })
    .then((contact) =>
      res.status(201).json({
        success: true,
        data: contact,
        message: 'Gửi thông tin liên hệ thành công',
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

module.exports = { handleSendContact };
