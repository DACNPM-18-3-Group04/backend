const handleCreateContact = require('./sendContact.service');
const handleFetchAllMyContact = require('./fetchAll.service');
const handleSendReview = require('./sendReview.service');
const handleGetReviews = require('./getReviews.service');
const handleReportReview = require('./reportReview.service');
const handleGetReviewsReported = require('./getReviewsReported.admin')

module.exports = {
  handleCreateContact,
  handleFetchAllMyContact,
  handleSendReview,
  handleGetReviews,
  handleReportReview,
  handleGetReviewsReported,
};
