const User = require("../../models/userModel");
const { Conflict } = require("../../helpers/errors");

const register = async (email, password) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use", "conflict");
  }

  await User.create({ email, password });

  const newUser = await User.findOne({ email }).select({
    email: 1,
    subscription: 1,
    _id: 0,
  });

  return newUser;
};

module.exports = register;
