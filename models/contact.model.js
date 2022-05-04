const Sequelize = require('sequelize');
const db = require('../configs/database');
const Property = require('./property.model');
const User = require('./user.model');
const ContactStatus = require('../configs/constants/contact/contactStatus');

const tableName = 'contact';

const Contact = db.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // property_id: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: Property,
  //     key: 'id',
  //   },
  // },
  contact_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  notes: {
    type: Sequelize.STRING(255),
    defaultValue: '',
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

module.exports = Contact;
