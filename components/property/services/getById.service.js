/* eslint-disable no-throw-literal */
/* eslint-disable no-plusplus */
const {
  Property: propertyModel,
  District,
  Province,
  User,
} = require('../../../models');

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
