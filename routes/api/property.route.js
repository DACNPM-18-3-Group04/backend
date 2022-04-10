const express = require('express');
const PropertyController = require('../../components/property/property.controller');
const PropertyLocationController = require('../../components/propertyLocation/propertyLocation.controller');
const { auth } = require('../../components/auth/auth.middleware');
const router = express.Router();

router.get(
  '/locations/districts',
  PropertyLocationController.handleGetDistricts,
);

router.get('/search', PropertyController.handleSearchProperty);

router.post('/', auth, PropertyController.handleCreateProperty);

module.exports = router;
