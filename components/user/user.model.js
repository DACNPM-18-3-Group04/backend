const Sequelize = require('sequelize');
const db = require('../../configs/database');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  fullname: {
    type: Sequelize.STRING,
  },
  contact_email: {
    type: Sequelize.STRING,
  },
  contact_number: {
    type: Sequelize.DataTypes.STRING(11),
  },
  avatar: {
    type: Sequelize.STRING,
  },
  account_type: {
    type: Sequelize.DataTypes.STRING(3),
  },
});

User.sync({ alter: true })
  .then(() => {
    console.log('User table synced');
  })
  .catch((err) => {
    console.log('Error syncing table User - ' + err.message);
  });

module.exports = User;
