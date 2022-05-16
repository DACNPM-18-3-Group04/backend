const express = require('express');
const { auth } = require('../../components/auth/auth.middleware');
const ContactController = require('../../components/contact/contact.controller');

const router = express.Router();

router.post('/send', auth, ContactController.handleSendContact);

router.get('/list', auth, ContactController.handleGetListContact);

router.post('/review', auth, ContactController.handleSendReview);

router.get('/reviews', auth, ContactController.handleGetReviews);

router.post('/report', auth, ContactController.handleReportReview);

router.get(
  '/review/report/all',
  auth,
  ContactController.handleAdminGetReviewsReported,
);

router.put(
  '/review/report',
  auth,
  ContactController.handleAdminRemoveReviewReported,
);

module.exports = router;
