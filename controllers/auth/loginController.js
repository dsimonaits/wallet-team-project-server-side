const loginService = require("../../services/auth/loginService");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginService(email, password);

  if (!user) {
    return res.status(400).json({
      message: "Incorrect login or password",
    });
  }

  return res.json({
    Status: "200 OK",
    ResponseBody: {
      token: user.token,
      name: user.name,
      balance: user.balance,
    },
  });
};

module.exports = loginController;
