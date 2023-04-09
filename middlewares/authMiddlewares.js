const passport = require("passport");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {

    
    if (!user || err || user.token !== req.headers.authorization.slice(7)) {
      return res.status(401).json({
        Status: "401 Unauthorized",
        ResponseBody: {
          message: "Not authorized",
        },
      });
    }

    req.user = user;

    next();
  })(req, res, next);
};

module.exports = auth;
