const getById = require('./getById');
const getBasicById = require('./getById.basic');
const updateById = require('./updateById');

const PropertyRepository = {
  getById,
  getBasicById,
  updateById,
};

module.exports = PropertyRepository;
