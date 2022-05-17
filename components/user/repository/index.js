// user.repository.js
const getById = require('./getById');
const getByEmail = require('./getByEmail');
const updateById = require('./updateById');

const UserRepository = {
  getById,
  getByEmail,
  updateById,
};

module.exports = {
  // Make code editor know to suggest stuff
  ...UserRepository,
};
