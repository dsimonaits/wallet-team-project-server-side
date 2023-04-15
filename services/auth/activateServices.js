const UserSchema = require("../../models/userSchema");
const { AuthError } = require("../../helpers/errors");

const activateServices = async (activationLink) => {
  const user = await UserSchema.findOne({ activationLink });
  if (!user) {
    throw new AuthError("User is not found");
  }
  user.isActivated = true;
  await user.save();
};

module.exports = activateServices;
