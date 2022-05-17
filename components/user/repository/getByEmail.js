/* eslint-disable arrow-body-style */
const { User } = require('../../../models');

const getByEmail = async (email = '') => {
  return User.findOne({
    where: {
      email: email,
    },
  });
};

module.exports = getByEmail;
