const Sequelize = require('sequelize');
const db = require('../../configs/database');
const Property = require('../property/property.model');
const User = require('../user/user.model');
const ContactStatus = require('../../configs/constants/contact/contactStatus');

const tableName = 'contact';

const Contact = db.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  property_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Property,
      key: 'id',
    },
  },
  contact_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  type: {
    type: Sequelize.STRING(3),
    // defaultValue: ,
    // comment: '',
  },
  status: {
    type: Sequelize.STRING(2),
    defaultValue: ContactStatus.DEFAULT,
  },
});

Contact.belongsTo(User, {
  foreignKey: 'contact_user',
});
Contact.belongsTo(Property, {
  foreignKey: 'property_id',
});

Contact.sync({ alter: true })
  .then(() => {
    console.log(`${tableName} table synced`);
  })
  .catch((err) => {
    console.log(`Error syncing table ${tableName} - ${err.message}`);
  });

module.exports = Contact;
