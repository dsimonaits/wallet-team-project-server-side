const logoutService = require("../../services/auth/logoutServices");

const logoutController = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  await logoutService(refreshToken);
  res.clearCookie("refreshToken");

  res.json({
    message: "Logout success response",
    Status: " 204 No Content",
  });
};

module.exports = logoutController;
