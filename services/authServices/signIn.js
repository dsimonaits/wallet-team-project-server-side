const User = require("../../models/userModel");
const { Unauthorized } = require("../../helpers/errors");
const jwt = require("jsonwebtoken");

const signIn = async (email, password) => {
  let user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    throw new Unauthorized("Email or password is wrong", "Unauthorized");
  }

  const token = jwt.sign({ _id: user._id, email }, process.env.SECRET, {
    expiresIn: "1h",
  });

  user = await User.findOneAndUpdate(
    { email },
    { $set: { token: token } },
    { new: true }
  ).select({ email: 1, subscription: 1, token: 1, _id: 0 });

  return user;
};

module.exports = signIn;
