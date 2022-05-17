/* eslint-disable arrow-body-style */
const sequelize = require('sequelize');
const {
  Property: propertyModel,
  PropertyImage,
  District,
  Province,
  User,
  Contact,
  Review,
} = require('../../../models');

const getById = async (id) => {
  return propertyModel.findOne({
    where: {
      id: id,
    },
    subQuery: false,
    attributes: {
      include: [
        [
          sequelize.fn('AVG', sequelize.col('contacts.review.rating')),
          'total_rating',
        ],
      ],
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
        model: Contact,
        required: false,
        include: [
          {
            required: false,
            model: Review,
          },
        ],
      },
    ],
    group: ['id'],
    // logging: console.log,
  });
};

module.exports = getById;
