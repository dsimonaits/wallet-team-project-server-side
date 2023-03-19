const User = require("../../models/userModel");
const gravatar = require("gravatar");
const { Conflict } = require("../../helpers/errors");

const register = async (email, password) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use", "conflict");
  }

  const avatarURL = gravatar.url(email);

  await User.create({ email, password, avatarURL });

  const newUser = await User.findOne({ email }).select({
    email: 1,
    subscription: 1,
    _id: 0,
  });

  return newUser;
};

module.exports = register;
