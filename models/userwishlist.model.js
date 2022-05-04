const Sequelize = require('sequelize');
const db = require('../configs/database');

const User = require('./user.model');
const Property = require('./property.model');
const WishlistStatus = require('../configs/constants/wishlistStatus');

const tableName = 'userwishlist';

const UserWishlist = db.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  property_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Property,
      key: 'id',
    },
    comment: 'The property',
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    comment: 'The user who created this',
  },
  status: {
    type: Sequelize.STRING(2),
    defaultValue: WishlistStatus.DEFAULT,
    comment: 'A - Added, R - Removed',
  },
});

module.exports = UserWishlist;
