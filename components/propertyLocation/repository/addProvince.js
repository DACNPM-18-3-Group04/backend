/* eslint-disable arrow-body-style */
const { Province } = require('../../../models');

const addProvince = async (paramsAdd) => {
  return Province.create(paramsAdd);
};

module.exports = addProvince;
