const Sequelize = require('sequelize');
const db = require('../configs/database');
const Contact = require('./contact.model');

const tableName = 'review';

const Review = db.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  contact_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Contact,
      key: 'id',
    },
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      len: [0, 5],
    },
  },
  review: {
    type: Sequelize.STRING(255),
    defaultValue: '',
  },
  status: {
    type: Sequelize.STRING(2),
    defaultValue: '',
  },
});

module.exports = Review;
