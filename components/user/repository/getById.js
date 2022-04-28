/* eslint-disable arrow-body-style */
const { User } = require('../../../models');

const getById = async (userId) => {
  return User.findOne({
    where: {
      id: userId,
    },
  });
};

module.exports = getById;
