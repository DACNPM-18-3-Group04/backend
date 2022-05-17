/* eslint-disable arrow-body-style */
const { Property: propertyModel } = require('../../../models');

// Get only basic info
const getBasicById = async (id) => {
  return propertyModel.findOne({
    where: {
      id: id,
    },
    // logging: console.log,
  });
};

module.exports = getBasicById;
