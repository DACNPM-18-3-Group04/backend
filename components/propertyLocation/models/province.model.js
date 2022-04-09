const Sequelize = require('sequelize');
const db = require('../../../configs/database');

const tableName = 'province';

const Province = db.define(
  tableName,
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(50),
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Province;
