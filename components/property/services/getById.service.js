/* eslint-disable no-throw-literal */
/* eslint-disable no-plusplus */
const sequelize = require('sequelize');
const propertyModel = require('../property.model');
const { District, Province } = require('../../propertyLocation/models');
const User = require('../../user/user.model');
const { Contact, Review } = require('../../contact/model');
const { isEmpty, handle } = require('../../../utils/helpers');

const handleGetPropertyById = async ({ id, userID }) => {
  const property = await propertyModel.findOne({
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
        model: District,
        include: Province,
        attributes: ['id', 'name'],
      },
      {
        model: User,
        attributes: ['id', 'email', 'fullname', 'avatar', 'status'],
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

  if (!property) {
    throw 'Not found';
  }

  if (isEmpty(userID)) {
    const contactor = await handle(
      Contact.findOne({
        where: {
          contact_user: userID,
        },
        attributes: ['type', 'status'],
        include: {
          model: Review,
          attributes: ['rating', 'status'],
        },
      }),
    );
    if (!isEmpty(contactor)) return { property, contactor };
  }

  return {
    property,
  };
};

module.exports = handleGetPropertyById;
