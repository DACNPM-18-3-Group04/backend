const handleGetAllDistrict = require('./getAllDistrict');
const handleGetAllProvince = require('./getAllProvince');

const addDistrict = require('./addDistrict.admin.service');
const addProvince = require('./addProvince.admin.service');

const updateDistrict = require('./updateDistrict.admin.service');
const updateProvince = require('./updateProvince.admin.service');

const removeDistrict = require('./removeDistrict.admin.service');
const removeProvince = require('./removeProvince.admin.service');

module.exports = {
  handleGetAllDistrict,
  handleGetAllProvince,

  addDistrict,
  addProvince,

  updateDistrict,
  updateProvince,

  removeDistrict,
  removeProvince,
};
