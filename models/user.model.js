const Sequelize = require('sequelize');
const db = require('../configs/database');
const AccountStatus = require('../configs/constants/accountStatus');

const User = db.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      //unique: true,
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
    token: {
      type: Sequelize.DataTypes.STRING(24),
    },
    status: {
      type: Sequelize.DataTypes.STRING(2),
      defaultValue: AccountStatus.DEFAULT,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
  },
);

module.exports = User;
