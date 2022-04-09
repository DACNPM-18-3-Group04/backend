const express = require('express');
const router = express.Router();

const PropertyLocationController = require('../../components/propertyLocation/propertyLocation.controller');

router.get(
  '/locations/districts',
  PropertyLocationController.handleGetDistricts,
);

module.exports = router;
