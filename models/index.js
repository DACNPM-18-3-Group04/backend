const User = require('./user.model');
const Property = require('./property.model');
const { District, Province } = require('./propertyLocation');
const Contact = require('./contact.model');

// Setting up relationships

Contact.belongsTo(User, {
  as: 'contactor',
  foreignKey: { name: 'contact_user', allowNull: false },
});
Contact.belongsTo(Property, {
  as: 'receiver',
  foreignKey: { name: 'property_id', allowNull: false },
});

Property.belongsTo(District, {
  foreignKey: 'district_id',
});
Property.belongsTo(User, {
  foreignKey: 'author_id',
});

// Setting up relationships

module.exports = {
  User,
  Property,
  District,
  Province,
  Contact,
};
