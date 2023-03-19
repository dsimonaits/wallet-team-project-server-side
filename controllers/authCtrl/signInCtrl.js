const { signIn } = require("../../services/authServices");
const { responseOk } = require("../../helpers/responses");

const signInCtrl = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await signIn(email, password);

  return res.json(
    responseOk("Success", 200, "User signed in successfully", user)
  );
};

module.exports = signInCtrl;
