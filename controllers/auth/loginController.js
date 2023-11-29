const loginService = require("../../services/auth/loginService");
const { responseOk } = require("../../helpers/responses");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const data = await loginService(email, password);

  res.cookie("refreshToken", data.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  const { refreshToken, ...restData } = data;

  res.json(responseOk("success", 200, "Login is successful", restData));
};

module.exports = loginController;
