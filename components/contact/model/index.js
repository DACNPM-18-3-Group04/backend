const Property = require('../../property/property.model');
const User = require('../../user/user.model');
const Contact = require('./contact.model');
const Review = require('./review.model');

Property.hasMany(Contact, {
  foreignKey: 'id',
});

Contact.belongsTo(User, {
  as: 'contactor',
  foreignKey: 'contact_user',
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

module.exports = {
  Contact,
  Review,
};
