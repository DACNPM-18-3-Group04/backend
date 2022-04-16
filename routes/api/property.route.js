const express = require('express');
const PropertyController = require('../../components/property/property.controller');
const PropertyLocationController = require('../../components/propertyLocation/propertyLocation.controller');
const { auth } = require('../../components/auth/auth.middleware');
const router = express.Router();

const microServiceProperty = require('../../miscroservice/propertyService')

router.get(
  '/locations/districts',
  PropertyLocationController.handleGetDistricts,
);

router.get('/search',microServiceProperty.handleSearchProperty);

router.post('/', auth, microServiceProperty.handleCreateProperty);

router.post('/update', auth, microServiceProperty.handleUpdateProperty);

router.get('/',microServiceProperty.handleGetListProperty);

router.get('/details', microServiceProperty.handleGetPropertyById);

module.exports = router;
