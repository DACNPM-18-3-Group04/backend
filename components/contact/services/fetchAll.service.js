const { handle } = require('../../../utils/helpers');
const {
  Contact,
  User,
  Property,
  District,
  Province,
} = require('../../../models');

const handleFetchAllMyContact = async ({ userID }) => {
  const [contacts, err] = await handle(
    Contact.findAll({
      exclude: ['property_id'],
      include: [
        {
          model: User,
          attributes: ['fullname', 'contact_email', 'contact_number', 'avatar'],
        },
        {
          model: Property,
          where: {
            author_id: userID,
          },
          attributes: ['id', 'title', 'type'],
          include: [
            {
              model: User,
              attributes: ['id', 'fullname', 'avatar'],
            },
            {
              model: District,
              attributes: ['id', 'name'],
              include: Province,
            },
          ],
        },
      ],
      order: [['updatedAt', 'DESC']],
    }),
  );
  if (err) throw err;

  return { contacts };
};

module.exports = handleFetchAllMyContact;
