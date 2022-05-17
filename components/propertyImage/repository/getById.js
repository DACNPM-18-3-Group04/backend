/* eslint-disable arrow-body-style */
const { PropertyImage } = require('../../../models');

const getById = async ({ id }) => {
  return PropertyImage.findOne({ where: { id: id } });
};

module.exports = getById;
