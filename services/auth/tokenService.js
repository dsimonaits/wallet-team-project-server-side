const jwt = require("jsonwebtoken");
const TokenSchema = require("../../models/tokenSchema");

const tokenService = async (payload) => {
  const accessToken = jwt.sign(payload, process.env.SECRET, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return {
    accessToken,
    refreshToken,
  };
};

const saveToken = async (userId, refreshToken) => {
  const tokenData = await TokenSchema.findOne({ user: userId });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await TokenSchema.create({ user: userId, refreshToken });
  return token;
};

module.exports = { tokenService, saveToken };
