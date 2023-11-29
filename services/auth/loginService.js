const UserSchema = require("../../models/userSchema");
const bcrypt = require("bcryptjs");
const { tokenService, saveToken } = require("./tokenService");
const { userDto } = require("../../helpers/dtos");
const { RequestError } = require("../../helpers/errors");

const loginService = async (email, password) => {
  const user = await UserSchema.findOne({ email });

  if (!user) {
    throw new RequestError("Email or password are incorrect");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw new RequestError("Email or password are incorrect");
  }

  const newUserDto = userDto(user);

  const tokens = await tokenService(newUserDto);
  await saveToken(newUserDto._id, tokens.refreshToken);

  return { ...tokens, ...newUserDto };
};

module.exports = loginService;
