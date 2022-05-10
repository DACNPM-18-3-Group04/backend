// Authorization microservice wrapper
const client = require('./client.mservice');
const { metadata } = require('./helper');
const { handle } = require('../../../../utils/helpers');

const isAuthorized = async (userId = '') => {
  // console.log(userId);
  // eslint-disable-next-line no-unused-vars
  const promise = new Promise((resolve, reject) => {
    client.isAuthorized({ userID: userId }, metadata, (err, data) => {
      if (err) {
        console.log(err);
        // Temporarily give authorization if err
        resolve({
          authorized: true,
        });
        return;
      }
      resolve({
        authorized: data.authorized,
      });
    });
  });
  const [auth, errAuth] = await handle(promise);
  if (errAuth) {
    return {
      authorized: true,
    };
  }

  return {
    authorized: auth.authorized,
  };
};

const banUser = async (userId = '') => {
  //console.log(userId);
  // eslint-disable-next-line no-unused-vars
  const promise = new Promise((resolve, reject) => {
    client.banUser({ userID: userId }, metadata, (err, data) => {
      if (err) {
        console.log(err);
        resolve({
          success: false,
        });
        return;
      }
      resolve({
        success: data.success,
      });
    });
  });

  const [res] = await handle(promise);
  return {
    success: res.success,
  };
};

const unbanUser = async (userId = '') => {
  //console.log(userId);
  // eslint-disable-next-line no-unused-vars
  const promise = new Promise((resolve, reject) => {
    client.banUser({ userID: userId }, metadata, (err, data) => {
      if (err) {
        console.log(err);
        resolve({
          success: false,
        });
        return;
      }
      resolve({
        success: data.success,
      });
    });
  });

  const [res] = await handle(promise);
  return {
    success: res.success,
  };
};

const AuthMService = {
  isAuthorized,
  banUser,
  unbanUser,
};

module.exports = AuthMService;
