/* eslint-disable no-throw-literal */
/* eslint-disable no-plusplus */
const sequelize = require('sequelize');
const { isEmpty, handle } = require('../../../utils/helpers');
const {
  Property: propertyModel,
  District,
  Province,
  User,
  Contact,
  Review,
} = require('../../../models');

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

  if (!property) {
    throw 'Not found';
  }

  if (!isEmpty(userID)) {
    const [myContact, err] = await handle(
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
    if (err) throw err;
    if (!isEmpty(myContact)) return { property, myContact };
  }

  return { property };
};

module.exports = handleGetPropertyById;
