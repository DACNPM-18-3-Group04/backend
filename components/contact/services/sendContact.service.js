const { handle, isEmpty } = require('../../../utils/helpers');
const { Contact, Property } = require('../../../models');

const handleSendContact = async ({ userID, propertyID, notes }) => {
  const [contact, err] = await handle(
    Contact.findOne({
      where: {
        property_id: propertyID,
        contact_user: userID,
      },
      include: {
        model: Property,
        attributes: ['author_id'],
      },
      raw: true,
    }),
  );
  if (err) {
    // console.log(err);
    throw new Error('Lỗi không tìm thấy thông tin liên hệ');
  }

  // console.log(contact);
  if (contact && contact['property.author_id'] === userID) {
    throw new Error('Không thể tự để liên hệ cho chính mình');
  }

  if (!isEmpty(contact)) {
    const [newContact, err2] = await handle(
      Contact.update({ notes }, { where: { id: contact.id } }),
    );
    if (err2) throw err2;
    return newContact;
  }

  const [newContact, err2] = await handle(
    Contact.create({
      notes,
      property_id: propertyID,
      contact_user: userID,
    }),
  );
  if (err2) throw err2;
  return newContact;
};

module.exports = handleSendContact;
