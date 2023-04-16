const TokenSchema = require("../../models/tokenSchema");

const logoutService = async (refreshToken) => {
  await TokenSchema.deleteOne({ refreshToken });
};

module.exports = logoutService;
