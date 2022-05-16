// Authorization microservice wrapper
const clientGRPC = require('./client.grpc.mservice');
const clientREST = require('./client.rest.mservice');
const { metadata } = require('./helper');
const { handle } = require('../../../../utils/helpers');

const isAuthorizedGRPC = async (userId = '') => {
  // console.log(userId);
  // eslint-disable-next-line no-unused-vars
  const promise = new Promise((resolve, reject) => {
    clientGRPC.isAuthorized({ userID: userId }, metadata, (err, data) => {
      if (err) {
        console.log('Error');
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

const banUserGRPC = async (userId = '') => {
  //console.log(userId);
  // eslint-disable-next-line no-unused-vars
  const promise = new Promise((resolve, reject) => {
    clientGRPC.banUser({ userID: userId }, metadata, (err, data) => {
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

const unbanUserGRPC = async (userId = '') => {
  //console.log(userId);
  // eslint-disable-next-line no-unused-vars
  const promise = new Promise((resolve, reject) => {
    clientGRPC.banUser({ userID: userId }, metadata, (err, data) => {
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

const isAuthorizedREST = async (userId = '') => {
  const [auth, errAuth] = await handle(clientREST.isAuthorized({ userId }));
  if (errAuth) {
    console.log(errAuth);
    return {
      authorized: true,
    };
  }

  return {
    authorized: auth.data.data.authorized,
  };
};

const banUserREST = async (userId = '') => {
  const [auth, errAuth] = await handle(clientREST.banUser({ userId }));
  if (errAuth) {
    console.log(errAuth);
    return {
      success: false,
    };
  }

  return {
    success: auth.data.data.success,
  };
};

const unbanUserREST = async (userId = '') => {
  const [auth, errAuth] = await handle(clientREST.unbanUser({ userId }));
  if (errAuth) {
    console.log(errAuth);
    return {
      success: false,
    };
  }
  // console.log(userId);
  // console.log(auth.data);
  return {
    success: auth.data.data.success,
  };
};

const AuthMService = {
  isAuthorized: isAuthorizedREST,
  banUser: banUserREST,
  unbanUser: unbanUserREST,
  isAuthorizedGRPC,
  banUserGRPC,
  unbanUserGRPC,
};

module.exports = AuthMService;
