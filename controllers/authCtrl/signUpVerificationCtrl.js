const { signUpVerification } = require("../../services/authServices");
const { responseOk } = require("../../helpers/responses");

const signUpVerificationCtrl = async (req, res, next) => {
  const { verificationToken } = req.params;

  await signUpVerification(verificationToken);

  res.json(responseOk("Success", 200, "Verification successful"));
};

module.exports = signUpVerificationCtrl;
