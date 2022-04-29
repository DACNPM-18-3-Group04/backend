const getAllLocation = require('./getAllLocation');

const addDistrict = require('./addDistrict');
const updateDistrict = require('./updateDistrict');
const removeDistrict = require('./removeDistrict');

const addProvince = require('./addProvince');
const updateProvince = require('./updateProvince');
const removeProvince = require('./removeProvince');

const PropertyLocationRepository = {
  getAllLocation,

  addDistrict,
  updateDistrict,
  removeDistrict,

  addProvince,
  updateProvince,
  removeProvince,
};

module.exports = {
  ...PropertyLocationRepository,
};
