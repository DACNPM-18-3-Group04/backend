const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const config = require('../default.config');
const { hbsOptions } = require('./mail_template.config');
const mailConfig = config.smtp_mail;

const transporter = nodemailer.createTransport({
  service: mailConfig.service,
  auth: {
    type: 'OAuth2',
    user: mailConfig.username,
    clientId: mailConfig.clientId,
    clientSecret: mailConfig.clientSecret,
    refreshToken: mailConfig.refreshToken,
  },
});

transporter.use('compile', hbs(hbsOptions));

module.exports = transporter;
