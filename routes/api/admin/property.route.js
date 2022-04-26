const express = require('express');
const { auth } = require('../../../components/auth/auth.middleware');
const router = express.Router();
const PropertyController = require('../../../components/property/property.controller');

router.get('/', auth, PropertyController.handleAdminGetProperty);

module.exports = router;
