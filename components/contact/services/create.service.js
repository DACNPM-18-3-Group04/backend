const { handle, isEmpty } = require('../../../utils/helpers');
const ContactModel = require('../contact.model');

const handleSendContact = async ({ userID, propertyID, notes }) => {
  const [contact, err] = await handle(
    ContactModel.findOne({
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
  if (isEmpty(contact)) throw new Error('Thông tin liên hệ không tồn tại');

  const newContact = await handle(
    ContactModel.create({
      notes,
      propertyID: propertyID,
      contact_user: userID,
    }),
  );

  console.log(newContact);
  return newContact;
};

module.exports = handleSendContact;
