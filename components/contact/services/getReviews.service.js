const { Op } = require('sequelize');
const { handle } = require('../../../utils/helpers');
const { Contact, Review, User, ReviewReport } = require('../../../models');

const handleGetReviews = async (propertyID) => {
  const [reviews, err] = await handle(
    Contact.findAll({
      where: {
        property_id: propertyID,
      },
      attributes: [],
      include: [
        {
          model: Review,
          attributes: ['id', 'review', 'rating'],
          include: [
            {
              model: ReviewReport,
              attributes: ['id', 'status'],
              where: {
                status: { [Op.not]: 'E' },
              },
              required: false,
            },
          ],
        },
        {
          model: User,
          attributes: ['avatar', 'fullname'],
        },
      ],
      raw: true,
    }),
  );
  if (err) throw err;

  return reviews;
};

module.exports = handleGetReviews;
