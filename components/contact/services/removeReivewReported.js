const {
  ReviewReport,
  Review,
  Contact,
  User,
  Property,
} = require('../../../models');
const { Op } = require('sequelize');
const { isEmpty, handle } = require('../../../utils/helpers');
const UserRepository = require('../../user/repository');
const AccountStatus = require('../../../configs/constants/accountStatus');
const AccountType = require('../../../configs/constants/accountType');
const ReviewStatus = require('../../../configs/constants/review/reviewStatus');
const ReviewReportStatus = require('../../../configs/constants/review/reviewReportStatus');

const handleGetReviewReports = async (params) => {
  console.log('handleGetReviewReports');

  // Validate user admin permission
  if (isEmpty(params.user)) {
    throw new Error('Không có quyền thực hiện hành động này');
  }

  const adminUserId = params.user.id;
  const [checkUser, errCheckAdmin] = await handle(
    UserRepository.getById(adminUserId),
  );

  if (errCheckAdmin) throw errCheckAdmin;
  console.log(checkUser);
  if (
    isEmpty(checkUser) ||
    checkUser.status !== AccountStatus.ACTIVE ||
    checkUser.account_type !== AccountType.ADMIN
  ) {
    throw new Error('Không có quyền thực hiện hành động này');
  }
  // Validate user admin permission

  let reportID = params.query.report_id;
  if (isEmpty(reportID)) {
    throw new Error('Không tìm thấy báo xấu');
  }

  // Get Report
  let [report, errReport] = await handle(
    ReviewReport.findOne({
      where: {
        id: reportID,
      },
    }),
  );
  if (errReport) throw errReport;
  if (isEmpty(report)) {
    throw new Error('Không tìm thấy báo xấu');
  }

  // Get Review
  let [review, errReview] = await handle(
    Review.findOne({
      where: {
        id: report.review_id,
      },
    }),
  );
  if (errReview) throw errReview;
  if (isEmpty(review)) {
    throw new Error('Không tìm thấy đánh giá');
  }

  // Update Review
  let [reviewUpdated, errReviewUpdated] = await handle(
    Review.update(
      {
        status: ReviewStatus.DELETED,
      },
      {
        where: {
          id: review.id,
        },
      },
    ),
  );
  if (errReviewUpdated) throw errReviewUpdated;

  // Update Report
  let [reportUpdated, errReportUpdated] = await handle(
    Review.update(
      {
        status: ReviewReportStatus.EXECUTED,
      },
      {
        where: {
          id: reportID,
        },
      },
    ),
  );
  if (errReportUpdated) throw errReportUpdated;

  return {};
};

module.exports = handleGetReviewReports;
