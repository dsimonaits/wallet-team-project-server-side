const UserSchema = require("../../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { RequestError } = require("../../helpers/errors");

const loginService = async (email, password) => {
  const user = await UserSchema.findOne({ email });

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw RequestError(401);
  }

  const payload = {
    _id: user.id,
  };

  const token = await jwt.sign(payload, process.env.SECRET, {
    expiresIn: "7d",
  });

  await UserSchema.findByIdAndUpdate(user._id, {
    token,
  });

  return await UserSchema.findOne({ email });
};

module.exports = loginService;
