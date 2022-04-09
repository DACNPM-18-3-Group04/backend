const Sequelize = require('sequelize');
const db = require('../../configs/database');

const User = require('../user/user.model');
const { District } = require('../propertyLocation/models');
const PropertyTypes = require('../../configs/constants/property/propertyType');
const PropertyStatus = require('../../configs/constants/property/propertyStatus');

const tableName = 'property';

const Property = db.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(500),
  },
  price: {
    type: Sequelize.FLOAT(15),
    allowNull: false,
  },
  area: {
    type: Sequelize.BIGINT(15),
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING(100),
    allowNull: false,
    comment: 'Address number, street & ward only',
  },
  type: {
    type: Sequelize.STRING(2),
    defaultValue: PropertyTypes.DEFAULT,
    comment: 'L - Property lent, S - Property sell',
  },
  district_id: {
    type: Sequelize.INTEGER,
    references: {
      model: District,
      key: 'id',
    },
  },
  author_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    comment: 'The user who created this',
  },
  status: {
    type: Sequelize.STRING(2),
    defaultValue: PropertyStatus.DEFAULT,
    comment: 'A - Active, D - Disabled, S - Stopped selling',
  },
});

Property.sync({ alter: true })
  .then(() => {
    console.log(`Table ${tableName} synced`);
  })
  .catch((err) => {
    console.log(`Error syncing table ${tableName} - ${err.message}`);
  });

module.exports = Property;
