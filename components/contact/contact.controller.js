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

const handleGetListContact = (req, res) => {
  ContactServices.handleFetchAllMyContact({ userID: req.user.id })
    .then((contacts) =>
      res.status(201).json({
        success: true,
        data: contacts,
        message: 'Lấy danh sách liên hệ thành công',
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

const handleSendReview = (req, res) => {
  ContactServices.handleSendReview({
    userID: req.user.id,
    content: req.body.content,
    rating: req.body.rating,
    propertyID: req.query.property_id,
  })
    .then((rv) =>
      res.status(201).json({
        success: true,
        data: rv,
        message: 'Gửi đánh giá thành công',
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

const handleGetReviews = (req, res) => {
  ContactServices.handleGetReviews(req.query.property_id)
    .then((r) =>
      res.status(201).json({
        success: true,
        data: r,
        message: 'Lấy danh sách đánh giá thành công',
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

const handleReportReview = (req, res) => {
  ContactServices.handleReportReview({
    propertyID: req.query.property_id,
    reason: req.body.reason,
    reviewID: req.query.review_id,
    userID: req.user.id,
  })
    .then((ok) =>
      res.status(201).json({
        success: true,
        data: ok,
        message: 'Gửi báo cáo thành công',
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

const handleAdminGetReviewsReported = (req, res) => {
  const params = {
    user: req.user,
    query: req.query,
    ...req.body,
  };

  ContactServices.handleGetReviewsReported(params)
    .then((data) =>
      res.status(200).send({
        success: true,
        data: data,
        message: 'Lấy danh sách đánh giá bị báo xấu thành công',
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
  handleSendContact,
  handleGetListContact,
  handleSendReview,
  handleGetReviews,
  handleReportReview,

  //Admin controllers
  handleAdminGetReviewsReported,
};
