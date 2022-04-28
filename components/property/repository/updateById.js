/* eslint-disable arrow-body-style */
const { Property } = require('../../../models');

const updateById = async (propertyId, updateParams = {}) => {
  return Property.update(updateParams, {
    where: {
      id: propertyId,
    },
  });
};

module.exports = updateById;
