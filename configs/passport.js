const passport = require('passport');
const passportJWT = require('passport-jwt');
const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
const apiConfig = require('./default.config').api;

const UserModel = require('../components/user/user.model');

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = apiConfig.secret_key;

const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
  UserModel.findOne({
    where: { id: jwt_payload.id },
  })
    .then((user) => {
      if (user) {
        return next(null, user.dataValues);
      }
      return next(null, false);
    })
    .catch((err) => next(err, false));
});
// use the strategy
passport.use(strategy);

module.exports = {
  passport,
  jwtOptions,
};
