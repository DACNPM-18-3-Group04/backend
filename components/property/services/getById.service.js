/* eslint-disable no-throw-literal */
/* eslint-disable no-plusplus */
const propertyModel = require('../property.model');

const handleGetPropertyById = async (params) => {
  const { id } = params;

  const property = await propertyModel.findAll({
    where: {
      id: +id,
    },
  });

  if (!property) {
    throw 'Not pound';
  }
  return {
    property,
  };
};

module.exports = handleGetPropertyById;
