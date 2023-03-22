const { resendVerification } = require("../../services/authServices");
const { responseOk } = require("../../helpers/responses");

const resendVerificationCtrl = async (req, res, next) => {
  const { email } = req.body;

  await resendVerification(email);

  res.json(responseOk("Success", 200, "Verification email sent"));
};

module.exports = resendVerificationCtrl;
