const { Unauthorized } = require("../../helpers/errors");
const { validateRefreshToken } = require("../../helpers/validation");
const TokenSchema = require("../../models/tokenSchema");
const { tokenService, saveToken } = require("./tokenService");
const { userDto } = require("../../helpers/dtos");
const UserSchema = require("../../models/userSchema");

const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new Unauthorized();
  }
  const userData = validateRefreshToken(refreshToken);
  const tokenFromDb = await TokenSchema.findOne({ refreshToken });
  if (!userData || !tokenFromDb) {
    throw new Unauthorized();
  }

  const user = await UserSchema.findOne({ _id: userData._id });
  const newUserDto = userDto(user);

  const tokens = await tokenService(newUserDto);
  await saveToken(newUserDto._id, tokens.refreshToken);

  return { ...tokens, ...newUserDto };
};

module.exports = refreshTokenService;
