const express = require('express');
const { auth } = require('../../components/auth/auth.middleware');
const ContactController = require('../../components/contact/contact.controller');

const router = express.Router();

router.post('/send', auth, ContactController.handleSendContact);

module.exports = router;
