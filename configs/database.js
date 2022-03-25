const Sequelize = require('sequelize');
const dbConfig = require('./default.config').database;

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.dbname,
  username: dbConfig.username,
  password: dbConfig.password,
  pool: {
    max: 2,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
