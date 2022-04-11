const { handle } = require('../../../utils/helpers');
const Property = require('../../property/property.model');
const User = require('../../user/user.model');
const ContactModel = require('../contact.model');

const handleSendContact = async ({ userID, propertyID, notes }) => {
  const [contact, created] = await handle(
    ContactModel.findOrCreate({
      defaults: {
        notes,
      },
      include: [
        {
          model: User,
          as: 'User',
          where: {
            id: userID,
          },
          attributes: [],
        },
        {
          model: Property,
          as: 'Property',
          where: {
            id: propertyID,
          },
          attributes: [],
        },
      ],
    }),
  );
  if (!created) throw new Error('Đã từng gửi thông tin liên hệ');

  console.log(contact);
  return contact;
};

module.exports = handleSendContact;
