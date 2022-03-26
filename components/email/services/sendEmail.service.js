const { handle, isEmpty } = require('../../../utils/helpers');
const { isValidMailContent, getMailInfomation } = require('../../../configs/nodemailer/mail_template.config');
const transporter = require('../../../configs/nodemailer/nodemailer');

async function sendEmail(params) {
  if (isEmpty(params.type)) {
    throw new Error('Vui lòng truyền type');
  }

  if (isEmpty(params.email)) {
    throw new Error('Vui lòng truyền email');
  }

  if (isEmpty(params.content)) {
    throw new Error('Vui lòng truyền email');
  }

  if (!isValidMailContent(params.type, params.content)) {
    throw new Error('Nội dung gửi không hợp lệ');
  }
  let email_info = getMailInfomation(params);

  console.log(email_info);
  let [response, err] = await handle(transporter.sendMail(email_info));
  if (err) {
    throw err;
  }

  return {
    success: true,
    data: {},
    message: 'Gửi email thành công',
  };
}
