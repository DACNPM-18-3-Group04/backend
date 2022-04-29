// user.repository.js
const getById = require('./getbyId');
const updateById = require('./updateById');

const UserRepository = {
  getById,
  updateById,
};

module.exports = {
  // Make code editor know to suggest stuff
  ...UserRepository,
};
