const passport = require("passport");
const passportJWT = require("passport-jwt");
const UserSchema = require("../models/userSchema.js");
require("dotenv").config();

const params = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new passportJWT.Strategy(params, async (payload, done) => {
    const user = await UserSchema.findOne({ _id: payload._id });
    if (!user) {
      return done(new Error("User not found"));
    }
    return done(null, user);
  })
);
