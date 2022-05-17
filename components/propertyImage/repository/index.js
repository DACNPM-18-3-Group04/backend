const create = require('./create');
const remove = require('./remove');
const getById = require('./getById');

const PropertyImageRepository = {
  create,
  remove,
  getById,
};

module.exports = PropertyImageRepository;
