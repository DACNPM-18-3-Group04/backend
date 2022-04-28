/* eslint-disable arrow-body-style */
const { User } = require('../../../models');

const updateById = async (userId, updateParams = {}) => {
  return User.update(updateParams, {
    where: {
      id: userId,
    },
  });
};

module.exports = updateById;
