/**
 * REQUIRE MODELS FROM THIS
 */
const User = require('./user.model');
const Property = require('./property.model');
const { District, Province } = require('./propertyLocation');
const Contact = require('./contact.model');
const Review = require('./review.model');

// Setting up relationships

Property.belongsTo(District, {
  foreignKey: 'district_id',
});
Property.belongsTo(User, {
  foreignKey: 'author_id',
});
Property.hasMany(Contact, {
  foreignKey: 'id',
});

Contact.belongsTo(User, {
  as: 'contactor',
  foreignKey: { name: 'contact_user', allowNull: false },
});
Contact.belongsTo(Property, {
  as: 'receiver',
  foreignKey: 'property_id',
});
Contact.hasOne(Review, {
  foreignKey: 'id',
});

Review.belongsTo(Contact, {
  foreignKey: 'contact_id',
});

// Setting up relationships

module.exports = {
  User,
  Property,
  District,
  Province,
  Contact,
  Review,
};
