const express = require('express');
const PropertyController = require('../../components/property/property.controller');
const PropertyLocationController = require('../../components/propertyLocation/propertyLocation.controller');
const { auth } = require('../../components/auth/auth.middleware');
const router = express.Router();

router.get(
  '/locations/districts',
  PropertyLocationController.handleGetDistricts,
);

router.get(
  '/locations/provinces',
  PropertyLocationController.handleGetProvinces,
);

router.get('/search', PropertyController.handleSearchProperty);

router.post('/', auth, PropertyController.handleCreateProperty);

router.post('/update', auth, PropertyController.handleUpdateProperty);

router.get('/', PropertyController.handleGetListProperty);

router.get('/details', PropertyController.handleGetPropertyById);

module.exports = router;
