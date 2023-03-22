const User = require("../../models/userModel");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { v4: uuidv4 } = require("uuid");
const { Conflict } = require("../../helpers/errors");
const { WrongParametersError } = require("../../helpers/errors");

const resendVerification = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Conflict("User not found", "conflict");
  }

  if (user.verify === true) {
    throw new WrongParametersError(
      "Verification has already been passed",
      "Bad Request"
    );
  }

  const verificationToken = uuidv4();

  user.verificationToken = verificationToken;

  await user.save();

  const msg = {
    to: email,
    from: "dsimonaits@gmail.com",
    subject: "Please verify your email",
    text: verificationRequestEmail(email, verificationToken),
    html: verificationRequestEmail(email, verificationToken),
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = resendVerification;
