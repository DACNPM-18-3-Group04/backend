/* eslint-disable no-throw-literal */
/* eslint-disable no-plusplus */
const propertyModel = require('../property.model');
const { District, Province } = require('../../propertyLocation/models');
const User = require('../../user/user.model');

const handleGetPropertyById = async (params) => {
  const { id } = params;

  const property = await propertyModel.findOne({
    where: {
      id: +id,
    },
    include: [
      {
        model: District,
        include: Province,
        attributes: ['id', 'name'],
      },
      {
        model: User,
        attributes: ['id', 'email', 'fullname', 'avatar', 'status'],
      },
    ],
  });

  if (!property) {
    throw 'Not pound';
  }
  return {
    property,
  };
};

module.exports = handleGetPropertyById;
