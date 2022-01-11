const passport = require("passport");
const passportjwt = require("passport-jwt");
const ExtractJwt = passportjwt.ExtractJwt;
const StrategyJwt = passportjwt.Strategy;
const db = require("../models");
const User = db.user;

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ENC,
    },
    (jwtPayload, done) => {
      return User.findOne({ where: { id: jwtPayload.id } })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
