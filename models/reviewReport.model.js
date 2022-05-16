const Sequelize = require('sequelize');
const db = require('../configs/database');

const tableName = 'reviewreport';

const ReviewReport = db.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  reason: {
    type: Sequelize.STRING(255),
    defaultValue: '',
  },
  status: {
    type: Sequelize.STRING(2),
    defaultValue: 'P',
    comment:
      'P: pending - S: skipped, review unchanged - E: executed, review removed',
  },
});

module.exports = ReviewReport;
