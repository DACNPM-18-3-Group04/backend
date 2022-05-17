/* eslint-disable arrow-body-style */
const { PropertyImage } = require('../../../models');

const remove = async ({ id }) => {
  return PropertyImage.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = remove;
