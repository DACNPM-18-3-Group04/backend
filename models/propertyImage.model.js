const Sequelize = require('sequelize');
const db = require('../configs/database');

const tableName = 'propertyImage';

const PropertyImage = db.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  image_link: {
    type: Sequelize.STRING,
    comment: 'Link for accessing',
  },
  public_id: {
    type: Sequelize.STRING,
    comment: 'Public image id use for removal,...',
  },
});

module.exports = PropertyImage;
