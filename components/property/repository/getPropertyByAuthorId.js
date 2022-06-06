const {
    Property,
    Contact,
    Review,
    ReviewReport,
} = require('../../../models');
const { Op } = require('sequelize');
const sequelize = require('../../../configs/database');


const getPropertyByAuthorId = async({author_id}) =>{
    return Property.findAll({
        where: {
          author_id: author_id,
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
}

module.exports = getPropertyByAuthorId;
