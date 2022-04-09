// Setting up relationships
const Province = require('./province.model');
const District = require('./district.model');

// Province.hasMany(District); 1 of two
District.belongsTo(Province, {
  foreignKey: 'province_id',
});

module.exports = {
  Province,
  District,
};
