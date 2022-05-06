/* eslint-disable no-throw-literal */
/* eslint-disable no-plusplus */
const sequelize = require('sequelize');
const {
  Property: propertyModel,
  District,
  Province,
  User,
  Contact,
  Review,
  UserWishlist,
} = require('../../../models');

const handleGetPropertyById = async ({ id, userID }) => {
  const property = await propertyModel.findOne({
    where: {
      id: id,
    },
    attributes: {
      include: [
        [
          sequelize.fn('AVG', sequelize.col('contacts.review.rating')),
          'total_rating',
        ],
        [
          sequelize.fn('COUNT', sequelize.col('contacts.id')),
          'rating_accumulator',
        ],
      ],
    },
    include: [
      {
        model: District,
        include: Province,
        attributes: ['id', 'name'],
      },
      {
        model: User,
        attributes: [
          'id',
          'email',
          'fullname',
          'avatar',
          'status',
          'contact_email',
          'contact_number',
        ],
        required: false,
      },
      {
        model: Contact,
        required: false,
        attributes: [],
        include: [
          {
            model: Review,
            required: false,
            attributes: [],
          },
        ],
      },
      {
        model: UserWishlist,
        required: false,
        attributes: ['status'],
        where: {
          user_id: userID,
        },
      },
    ],
    group: ['property.id'],
    // logging: console.log,
  });

  if (!property) {
    throw 'Not found';
  }

  return { property };
};

module.exports = handleGetPropertyById;
