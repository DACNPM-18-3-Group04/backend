const express = require('express');
const { auth } = require('../../../../components/auth/auth.middleware');
const router = express.Router();
const LocationController = require('../../../../components/propertyLocation/propertyLocation.controller');

router.post('/', auth, LocationController.handleAddProvince);

router.put('/:id', auth, LocationController.handleUpdateProvince);

router.delete('/:id', auth, LocationController.handleRemoveProvince);

module.exports = router;
