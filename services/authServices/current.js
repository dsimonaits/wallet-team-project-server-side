const User = require("../../models/userModel");
const { Unauthorized } = require("../../helpers/errors");

const current = async (id) => {
  const user = await User.findOne({ _id: id }).select({
    email: 1,
    subscription: 1,
    _id: 0,
  });

  if (!user) {
    throw new Unauthorized("Not authorized", "Unauthorized");
  }

  return user;
};

module.exports = current;
