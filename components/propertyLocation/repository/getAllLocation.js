/* eslint-disable arrow-body-style */
const { Province, District } = require('../../../models');

const getAllLocations = async () => {
  return Province.findAll({
    include: [
      {
        model: District,
      },
    ],
  });
};

module.exports = getAllLocations;
