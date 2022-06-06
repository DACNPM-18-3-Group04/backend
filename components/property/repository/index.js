const getById = require('./getById');
const getBasicById = require('./getById.basic');
const updateById = require('./updateById');
const createProperty = require('./createProperty')
const getPropertyById = require('./getPropertyById')
const getPropertyByAuthorId = require('./getPropertyByAuthorId')
const updateProperty = require('./updateProperty')
const PropertyRepository = {
  getById,
  getBasicById,
  updateById,
  createProperty,
  getPropertyById,
  getPropertyByAuthorId,
  updateProperty
};

module.exports = PropertyRepository;
