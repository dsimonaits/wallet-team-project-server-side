const User = require("../../models/userModel");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { Conflict } = require("../../helpers/errors");

const resendVerification = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Conflict("User not found", "conflict");
  }
  user.verify = true;
  user.verificationToken = "null";

  await user.save();

  const msg = {
    to: user.email,
    from: "dsimonaits@gmail.com",
    subject: "Registration",
    text: "Congratulations, you have successfully registered",
    html: "<strong>Congratulations, you have successfully registered</strong>",
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
