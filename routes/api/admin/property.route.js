const express = require('express');
const { auth } = require('../../../components/auth/auth.middleware');
const router = express.Router();
const DistrictRouter = require('./propertyLocation/district.route');
const ProvinceRouter = require('./propertyLocation/province.route');

const PropertyController = require('../../../components/property/property.controller');

router.get('/', auth, PropertyController.handleAdminGetProperty);

router.use('/district', DistrictRouter);
router.use('/province', ProvinceRouter);

module.exports = router;
