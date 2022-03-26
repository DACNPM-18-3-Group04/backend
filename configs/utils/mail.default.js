require('dotenv').config();

const DEFAULT_MAIL_OAUTH_CLIENTID = 'key';
const DEFAULT_MAIL_OAUTH_CLIENT_SECRET = 'secret';
const DEFAULT_MAIL_OAUTH_REFRESH_TOKEN = '';
const DEFAULT_MAIL_USERNAME = '***@gmail.com';
const DEFAULT_MAIL_PASSWORD = '**';

// MAIL
const getMailOAuthClientID = () => {
  return process.env.MAIL_OAUTH_CLIENTID || DEFAULT_MAIL_OAUTH_CLIENTID;
};

const getMailOAuthClientSecret = () => {
  return (
    process.env.MAIL_OAUTH_CLIENT_SECRET || DEFAULT_MAIL_OAUTH_CLIENT_SECRET
  );
};

const getMailOAuthRefreshToken = () => {
  return (
    process.env.MAIL_OAUTH_REFRESH_TOKEN || DEFAULT_MAIL_OAUTH_REFRESH_TOKEN
  );
};

const getMailUsername = () => {
  return process.env.MAIL_USERNAME || DEFAULT_MAIL_USERNAME;
};

const getMailPassword = () => {
  return process.env.MAIL_PASSWORD || DEFAULT_MAIL_PASSWORD;
};
// MAIL

module.exports = {
  getMailOAuthClientID,
  getMailOAuthClientSecret,
  getMailOAuthRefreshToken,
  getMailPassword,
  getMailUsername,
};
