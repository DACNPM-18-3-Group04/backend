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

  let [reportsAll, errReportsAll] = await handle(
    ReviewReport.findAll({
      include: {
        model: Review,
        as: 'review',
        required: true,
        include: [
          {
            model: Contact,
            as: 'contact',
            required: false,
            include: [
              {
                model: User,
                as: 'user',
                required: false,
                attributes: [
                  'id',
                  'contact_email',
                  'contact_number',
                  'avatar',
                  'fullname',
                ],
              },
              {
                model: Property,
                as: 'property',
                required: false,
                include: {
                  model: User,
                  as: 'user',
                  required: false,
                  attributes: [
                    'id',
                    'contact_email',
                    'contact_number',
                    'avatar',
                    'fullname',
                  ],
                },
              },
            ],
          },
        ],
        //Review filter
        where: {
          status: { [Op.not]: ReviewStatus.DELETED },
        },
      },
      //ReviewReport filter
      where: {
        status: { [Op.not]: ReviewReportStatus.EXECUTED },
      },
    }),
  );
  if (errReportsAll) throw errReportsAll;

  return {
    ...reportsAll,
  };
};

module.exports = handleGetReviewReports;
