/* eslint-disable arrow-body-style */
const { Property } = require('../../../models');
const createProperty = async (params) => {
  return Property.create(params);
};

module.exports = createProperty;
