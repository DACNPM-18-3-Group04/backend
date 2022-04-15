/**
 * Declaration file, DO NOT REQUIRE FROM THIS, this lacks relationships
 * REQUIRE FROM INDEX.JS
 */
const Sequelize = require('sequelize');
const db = require('../../configs/database');
const Province = require('./province.model');

const tableName = 'district';

const District = db.define(
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
    province_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Province,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  },
);

module.exports = District;
