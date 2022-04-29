const express = require('express');
const { auth } = require('../../../../components/auth/auth.middleware');
const router = express.Router();
const LocationController = require('../../../../components/propertyLocation/propertyLocation.controller');

router.post('/', auth, LocationController.handleAddDistrict);

router.put('/:id', auth, LocationController.handleUpdateDistrict);

router.delete('/:id', auth, LocationController.handleRemoveDistrict);

module.exports = router;
