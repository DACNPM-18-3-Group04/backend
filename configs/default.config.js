let appRoot = require('app-root-path');
const path = require('path');

require('dotenv').config();

const DefaultConfig = require('./utils/index');

module.exports = {
  api: {
    version: 'v1',
    lang_code: 'vi',
    env: 'local',
    secret_key: DefaultConfig.getSecretKey(),
    auth_header: 'Authorization',
  },

  auth_mservice: {
    host: process.env.AUTH_MSERVICE_HOST || 'http://localhost:3003',
    grpc_host: process.env.AUTH_MSERVICE_GRPC_HOST || 'localhost:50051',
    auth_header: 'authorization',
    secret_key: process.env.AUTH_MSERVICE_KEY || 'DEFAULT_SECRET_KEY',
  },

  temp_file_path: path.join(`${appRoot}`, './public/tempt'),

  client: {
    host: DefaultConfig.getClientHost(),
  },

  smtp_mail: {
    service: 'gmail',
    clientId: DefaultConfig.getMailOAuthClientID(),
    clientSecret: DefaultConfig.getMailOAuthClientSecret(),
    refreshToken: DefaultConfig.getMailOAuthRefreshToken(),
    username: DefaultConfig.getMailUsername(),
  },

  oAuthClientID: {
    google: DefaultConfig.getGoogleOauthClientID(),
  },

  database: {
    host: DefaultConfig.getDBHost(),
    port: DefaultConfig.getDBPort(),
    dbname: DefaultConfig.getDBName(),
    username: DefaultConfig.getDBUsername(),
    password: DefaultConfig.getDBPassword(),
  },
};
