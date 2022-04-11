// Setting up relationships
const Province = require('./province.model');
const District = require('./district.model');

Province.hasMany(District, {
  foreignKey: 'province_id',
});
District.belongsTo(Province, {
  foreignKey: 'province_id',
});

module.exports = {
  Province,
  District,
};
