const Sequelize = require('sequelize');
const db = require('../../configs/database');

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

Province.sync({ alter: true })
  .then(() => {
    console.log(`Table ${tableName} synced`);
  })
  .catch((err) => {
    console.log(`Error syncing table ${tableName} - ${err.message}`);
  });

module.exports = Province;
