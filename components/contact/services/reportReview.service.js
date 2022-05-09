const { ReviewReport, Property } = require('../../../models');
const { handle, isEmpty } = require('../../../utils/helpers');

const reportReview = async ({ propertyID, userID, reviewID, reason }) => {
  if (!propertyID || !userID || !reviewID) throw new Error('Invalid inputs');

  const [report, err] = await handle(
    ReviewReport.findOne({
      where: { review_id: reviewID },
      attributes: ['id'],
      raw: true,
    }),
  );
  if (err) throw err;
  if (!isEmpty(report)) throw new Error('Đã từng gửi báo cáo');

  const [property, err2] = await handle(
    Property.findOne({
      where: { id: propertyID, author_id: userID },
      attributes: ['id'],
      raw: true,
    }),
  );
  if (err2) throw err2;
  if (isEmpty(property)) throw new Error('Không tồn tại hoặc thiếu quyền');

  if (reason.length < 8) throw new Error('Ít hơn 8 ký tự');
  const ok = await ReviewReport.create({ review_id: reviewID, reason });

  return ok;
};

module.exports = reportReview;
