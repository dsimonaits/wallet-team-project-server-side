const jwt = require("jsonwebtoken");
const UserSchema = require("../models/userSchema");
const { Unauthorized, NotFound } = require("../helpers/errors");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Unauthorized("Not authorized");
    }
    const [tokenType, token] = req.headers.authorization.split(" ");
    if (tokenType !== "Baryer") {
      throw new Unauthorized("Invalid token type");
    }
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user) {
      throw new Unauthorized("Not authorized");
    }
    const findedUser = await UserSchema.findById({ _id: user.id });

    if (!findedUser) {
      throw new NotFound("User is not found");
    }
    req.user = findedUser;
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
