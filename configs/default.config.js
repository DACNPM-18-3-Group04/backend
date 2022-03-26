const DefaultConfig = require('./utils/index');

module.exports = {
  api: {
    version: 'v1',
    lang_code: 'vi',
    env: 'local',
    secret_key: DefaultConfig.getSecretKey(),
    auth_header: 'Authorization',
  },

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
