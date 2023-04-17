const UserSchema = require("../../models/userSchema");

const getUserData = async (userId) => {
  const user = await UserSchema.findById(userId);
  return user;
};

module.exports = getUserData;
