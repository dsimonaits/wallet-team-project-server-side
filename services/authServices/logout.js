const User = require("../../models/userModel");
const { Unauthorized } = require("../../helpers/errors");

const logout = async (id) => {
  const token = null;

  const user = await User.findOneAndUpdate({ _id: id }, { $set: { token } });

  if (!user) {
    throw new Unauthorized("Not authorized", "Unauthorized");
  }

  return user;
};

module.exports = logout;
