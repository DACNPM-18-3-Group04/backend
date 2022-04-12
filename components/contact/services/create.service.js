const { handle, isEmpty } = require('../../../utils/helpers');
const { Contact } = require('../model');

const handleSendContact = async ({ userID, propertyID, notes }) => {
  const [contact, err] = await handle(
    Contact.findOne({
      where: {
        property_id: propertyID,
        contact_user: userID,
      },
    }),
  );
  if (err) {
    console.log(err);
    throw new Error('Lỗi không tìm thấy thông tin liên hệ');
  }
  if (!isEmpty(contact)) {
    const newContact = await handle(
      Contact.update({ notes }, { where: { id: contact.id } }),
    );
    return newContact;
  }

  const newContact = await handle(
    Contact.create({
      notes,
      property_id: propertyID,
      contact_user: userID,
    }),
  );

  // console.log(newContact);
  return newContact;
};

module.exports = handleSendContact;
