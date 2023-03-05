const { register } = require("../../services/authServices");
const { responseOk } = require("../../helpers/responses");

const signUpCtrl = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await register(email, password);

  res.json(responseOk("Success", 201, "User created", user));
};

module.exports = signUpCtrl;
