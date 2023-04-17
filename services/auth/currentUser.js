const UserSchema = require("../../models/userSchema");

const currentUsers = async (userId) => {
  const user = await UserSchema.findOne({ _id: userId });
  return {
    name: user.name,
    balance: user.balance,
    email: user.email,
    createdAt: user.createdAt,
  };
};
module.exports = currentUsers;
