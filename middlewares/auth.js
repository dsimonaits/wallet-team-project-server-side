const passport = require("passport");

const auth = (req, res, next) => {
  try {
    const response = () => {
      return res.status(401).json({
        status: "unauthorized",
        code: 401,
        ResponseBody: { message: "Not authorized!" },
      });
    };

    const [, token] = req.headers.authorization.split(" ");

    passport.authenticate(
      "jwt",
      { session: false, failureMessage: true },
      (err, user) => {
        if (!user || err || token !== user.token) {
          return response();
        }
        req.user = user;
        next();
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
