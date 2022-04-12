const passport = require('passport');

const auth = async function (req, res, next) {
  return passport.authenticate('jwt', { session: false }, (err, user) => {
    // console.log(user);
    if (err || !user) {
      return res.status(401).json({
        success: false,
        data: {},
        message: 'Không có quyền thực hiện hành động này',
      });
    }

    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = {
  auth,
};
