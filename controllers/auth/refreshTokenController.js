const refreshTokenService = require("../../services/auth/refreshTokenService");
const { responseOk } = require("../../helpers/responses");

const refreshTokenController = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const data = await refreshTokenService(refreshToken);
  res.cookie("refreshToken", data.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.json(responseOk("success", 200, "Refresh is successful", data));
};

module.exports = refreshTokenController;
