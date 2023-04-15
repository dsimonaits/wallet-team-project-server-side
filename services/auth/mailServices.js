const nodemailer = require("nodemailer");
require("dotenv").config();

const config = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(config);

const sendActivationMail = async (to, link) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Activation your wallet account in" + process.env.BASE_URL,
      text: "",
      html: `
      <html>
        <body>
          <div>
            <h1>For activation push to link</h1>
            <a href="${link}">${link}</a>
          </div>
        </body>
      </html>
    `,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};
module.exports = sendActivationMail;
