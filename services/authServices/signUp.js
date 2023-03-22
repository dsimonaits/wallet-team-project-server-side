const User = require("../../models/userModel");
const { v4: uuidv4 } = require("uuid");
const gravatar = require("gravatar");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { verificationRequestEmail } = require("../../public/emailTemplate");
const { Conflict } = require("../../helpers/errors");

const register = async (email, password) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use", "conflict");
  }

  const avatarURL = gravatar.url(email);

  const verificationToken = uuidv4();

  await User.create({ email, password, avatarURL, verificationToken });

  const newUser = await User.findOne({ email }).select({
    email: 1,
    subscription: 1,
    _id: 0,
  });

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

  return newUser;
};

module.exports = register;
