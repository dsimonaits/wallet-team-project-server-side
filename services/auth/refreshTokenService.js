const { AuthError, Unauthorized } = require("../../helpers/errors");
const { validateRefreshToken } = require("../../helpers/validation");
const TokenSchema = require("../../models/tokenSchema");
const { tokenService, saveToken } = require("./tokenService");
const { userDto } = require("../../helpers/dtos");
const UserSchema = require("../../models/userSchema");

const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    return null;
  }
  const userData = validateRefreshToken(refreshToken);
  const tokenFromDb = await TokenSchema.findOne({ refreshToken });
  if (!userData || !tokenFromDb) {
    return null;
  }

  const user = await UserSchema.findOne({ _id: userData._id });
  const newUserDto = userDto(user);

  const tokens = await tokenService(newUserDto);
  await saveToken(newUserDto._id, tokens.refreshToken);

  return { ...tokens, ...newUserDto };
};

module.exports = refreshTokenService;
