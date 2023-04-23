const loginService = require("../../services/auth/loginService");
const { responseOk } = require("../../helpers/responses");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const data = await loginService(email, password);

  if (!data) {
    return res.status(400).json({
      message: "Incorrect login or password",
    });
  }

  res.cookie("refreshToken", data.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.json(responseOk("success", 200, "Login is successful", data));
};

module.exports = loginController;
