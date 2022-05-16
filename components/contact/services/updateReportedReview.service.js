const {
  //
  ReviewReport,
  Review,
} = require('../../../models');
const { isEmpty, handle } = require('../../../utils/helpers');
const UserRepository = require('../../user/repository');
const AccountStatus = require('../../../configs/constants/accountStatus');
const AccountType = require('../../../configs/constants/accountType');
const ReviewStatus = require('../../../configs/constants/review/reviewStatus');
const ReviewReportStatus = require('../../../configs/constants/review/reviewReportStatus');

const handleUpdateReportStatus = async (params) => {
  // Validate user admin permission
  if (isEmpty(params.user)) {
    throw new Error('Không có quyền thực hiện hành động này');
  }

  const adminUserId = params.user.id;
  const [checkUser, errCheckAdmin] = await handle(
    UserRepository.getById(adminUserId),
  );

  if (errCheckAdmin) throw errCheckAdmin;

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

  const reportUpdatedStatus = params.status;
  if (isEmpty(reportUpdatedStatus)) {
    throw new Error('Không có trạng thái mới để cập nhật');
  }

  if (reportUpdatedStatus === ReviewReportStatus.EXECUTED) {
    // Update Review
    // eslint-disable-next-line no-unused-vars
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
  } else if (reportUpdatedStatus !== ReviewReportStatus.SKIPPED) {
    throw new Error('Trạng thái cập nhật không hợp lệ');
  }

  // Update Review report
  // eslint-disable-next-line no-unused-vars
  let [reportUpdated, errReportUpdated] = await handle(
    ReviewReport.update(
      {
        status: reportUpdatedStatus,
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

module.exports = handleUpdateReportStatus;
