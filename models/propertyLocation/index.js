/**
 * REQUIRE MODELS FROM THIS
 */

const Province = require('./province.model');
const District = require('./district.model');

// Setting up relationships
Province.hasMany(District, {
  foreignKey: 'province_id',
});
District.belongsTo(Province, {
  foreignKey: 'province_id',
});
// Setting up relationships

module.exports = {
  Province,
  District,
};
