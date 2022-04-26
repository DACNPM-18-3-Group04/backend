const handleSearchProperty = require('./search.service');
const handleCreateProperty = require('./create.service');
const handleUpdateProperty = require('./update.service');
const handleGetListProperty = require('./getlist.service');
const handleGetPropertyById = require('./getById.service');
const handleAdminGetProperty = require('./adminGetList.service');

module.exports = {
  handleSearchProperty,
  handleCreateProperty,
  handleUpdateProperty,
  handleGetListProperty,
  handleGetPropertyById,
  handleAdminGetProperty,
};
