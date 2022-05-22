const passport = require('passport');
const { checkAuthorization } = require('./services');
const { handle } = require('../../utils/helpers');

const UnauthorizedResponse = {
  success: false,
  data: {},
  message: 'Không có quyền thực hiện hành động này',
};

const auth = async function (req, res, next) {
  return passport.authenticate('jwt', { session: false }, async (err, user) => {
    // console.log(user);
    if (err || !user) {
      return res.status(401).json(UnauthorizedResponse);
    }

    const userId = user.id;
    const [data, errAuth] = await handle(checkAuthorization({ userId }));
    // console.log(data);
    if (errAuth) {
      console.log(errAuth);
    }

    if (data && !data.authorized) {
      return res.status(401).json(UnauthorizedResponse);
    }

    req.user = user;
    return next();
  })(req, res, next);
};

const getUser = (req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, async (err, user) => {
      // console.log(user);
      if (err || !user) {
        reject(UnauthorizedResponse);
      }

      const userId = user.id;
      const [data, errAuth] = await handle(checkAuthorization({ userId }));
      // console.log(data);
      if (errAuth) {
        reject(errAuth);
      }

      if (data && !data.authorized) {
        reject(UnauthorizedResponse);
      }
      resolve(user);
    })(req, res);
  });

module.exports = {
  auth,
  getUser,
};
