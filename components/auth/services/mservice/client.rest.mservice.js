const axios = require('axios');
const config = require('../../../../configs/default.config');
const AuthHeader = config.auth_mservice.auth_header;

const headers = {};
headers[AuthHeader] = config.auth_mservice.secret_key;

const api = axios.create({
  baseURL: config.auth_mservice.host,
  headers: headers,
});

const isAuthorized = async ({ userId = '' }) => {
  const endpoint = '/auth';
  const data = {
    userID: userId,
  };
  return api.post(endpoint, data);
};

const banUser = async ({ userId = '' }) => {
  const endpoint = '/auth/ban';
  const data = {
    userID: userId,
  };
  return api.post(endpoint, data);
};

const unbanUser = async ({ userId = '' }) => {
  const endpoint = '/auth/unban';
  const data = {
    userID: userId,
  };
  return api.post(endpoint, data);
};

module.exports = {
  isAuthorized,
  banUser,
  unbanUser,
};
