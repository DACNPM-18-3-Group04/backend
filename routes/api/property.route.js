const express = require('express');
const PropertyController = require('../../components/property/property.controller');
const router = express.Router();

const PropertyLocationController = require('../../components/propertyLocation/propertyLocation.controller');

router.get(
  '/locations/districts',
  PropertyLocationController.handleGetDistricts,
);

router.get('/search', PropertyController.handleSearchProperty);

module.exports = router;
