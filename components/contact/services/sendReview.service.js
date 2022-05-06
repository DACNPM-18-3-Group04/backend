const { Contact, Review } = require('../../../models');
const { isEmpty, handle } = require('../../../utils/helpers');

const handleSendReview = async ({ userID, propertyID, rating, content }) => {
  if (content.length < 9) throw new Error('Nội dung phải trên 8 ký tự');

  const [contact, err] = await handle(
    Contact.findOne({
      where: {
        contact_user: userID,
        property_id: propertyID,
      },
      raw: true,
    }),
  );
  if (err) throw err;

  // console.log(contact);
  if (isEmpty(contact))
    throw new Error('Cần gửi liên hệ trước khi đánh giá người đăng');

  const [review, err2] = await handle(
    Review.findOne({
      where: {
        contact_id: contact.id,
      },
      raw: true,
    }),
  );
  if (err2) throw err2;

  // console.log(review);
  if (isEmpty(review)) {
    // create new review
    const newReview = await Review.create({
      contact_id: contact.id,
      review: content,
      rating: rating,
    });

    return newReview;
  }

  // update the existed one
  const rv = await Review.update(
    { review: content, rating: rating },
    { where: { id: review.id } },
  );

  return rv;
};

module.exports = handleSendReview;
