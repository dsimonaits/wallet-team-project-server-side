const { validateAccessToken } = require("../helpers/validation");
const { Unauthorized } = require("../helpers/errors");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Unauthorized("Not authorized");
    }
    const [tokenType, token] = req.headers.authorization.split(" ");
    if (tokenType !== "Bearer") {
      throw new Unauthorized("Invalid token type");
    }

    const userData = validateAccessToken(token);

    if (!userData) {
      throw new Unauthorized("Not authorized");
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(new Unauthorized());
  }
};

module.exports = authMiddleware;
