/* eslint-disable no-throw-literal */
/* eslint-disable no-plusplus */
const { Op } = require('sequelize');
const sequelize = require('../../../configs/database');
const {
  Property,
  PropertyImage,
  District,
  Province,
  User,
  UserWishlist,
  Contact,
  Review,
  ReviewReport,
} = require('../../../models');

const handleGetPropertyById = async ({ id, userID }) => {
  const property = await Property.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: PropertyImage,
        as: 'images',
        attributes: ['id', 'image_link'],
      },
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
        model: UserWishlist,
        required: false,
        attributes: ['status'],
        where: {
          user_id: userID,
        },
      },
    ],
    // logging: console.log,
  });

  if (!property) {
    throw 'Not found';
  }

  // get rating for the author of this property
  const author_reviews = await Property.findAll({
    where: {
      author_id: property.author_id,
    },
    attributes: [
      'id',
      [
        sequelize.fn('AVG', sequelize.col('contacts.review.rating')),
        'total_rating',
      ],
      [
        sequelize.fn('COUNT', sequelize.col('contacts.review.id')),
        'rating_accumulator',
      ],
    ],
    include: [
      {
        model: Contact,
        attributes: ['id'],
        include: [
          {
            model: Review,
            attributes: ['rating'],
            include: [
              {
                model: ReviewReport,
                attributes: ['id', 'status'],
                where: {
                  // not counting invalid review
                  status: { [Op.not]: 'E' },
                },
                required: false,
              },
            ],
          },
        ],
      },
    ],
    raw: true,
  });

  return {
    reviews: author_reviews.length && author_reviews[0],
    property,
  };
};

module.exports = handleGetPropertyById;
