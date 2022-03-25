require('dotenv').config(); //Add .env file variable to process.env

const DEFAULT_SMTP_MAIL_USERNAME = '***@gmail.com';
const DEFAULT_SMTP_MAIL_PASSWORD = '**';
const DEFAULT_GOOGLE_OAUTH_CLIENT_ID = '*';
const DEFAULT_CLIENT_HOST = 'localhost:3000';

const DEFAULT_SECRET_KEY = 'a3e75cdd13bdff759417988f501978ae';

// DATABASE
const DEFAULT_DB_HOST = 'localhost';
const DEFAULT_DB_PORT = '3306';
const DEFAULT_DB_NAME = 'test_db';
const DEFAULT_DB_USERNAME = 'root';
const DEFAULT_DB_PASSWORD = 'root';
// DATABASE

const getSmtpMailUsername = () => {
  return process.env.SMTP_MAIL_USERNAME || DEFAULT_SMTP_MAIL_USERNAME;
};

const getSmtpMailPassword = () => {
  return process.env.SMTP_MAIL_PASSWORD || DEFAULT_SMTP_MAIL_PASSWORD;
};

const getGoogleOauthClientID = () => {
  return process.env.GOOGLE_OAUTH_CLIENT_ID || DEFAULT_GOOGLE_OAUTH_CLIENT_ID;
};

const getClientHost = () => {
  return process.env.CLIENT_HOST || DEFAULT_CLIENT_HOST;
};

const getSecretKey = () => {
  return process.env.SECRET_KEY || DEFAULT_SECRET_KEY;
};

// DATABASE
const getDBHost = () => {
  return process.env.DB_HOST || DEFAULT_DB_HOST;
};

const getDBPort = () => {
  return process.env.DB_PORT || DEFAULT_DB_PORT;
};

const getDBName = () => {
  return process.env.DB_NAME || DEFAULT_DB_NAME;
};

const getDBUsername = () => {
  return process.env.DB_USERNAME || DEFAULT_DB_USERNAME;
};

const getDBPassword = () => {
  return process.env.DB_PASSWORD || DEFAULT_DB_PASSWORD;
};
// DATABASE

module.exports = {
  getSmtpMailUsername,
  getSmtpMailPassword,
  getGoogleOauthClientID,
  getClientHost,
  getSecretKey,
  // DATABASE
  getDBHost,
  getDBPort,
  getDBName,
  getDBUsername,
  getDBPassword,
  // DATABASE
};
