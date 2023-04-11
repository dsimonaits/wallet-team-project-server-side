const axios = require("axios");
const queryString = require("node:querystring");
const { AuthError } = require("../../helpers/errors");
const UserSchema = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.decode(urlObj.search.slice(1));
  const code = urlParams.code;
  if (!code) {
    throw new AuthError("Something goes wrong, try again please");
  }

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/user/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });
  if (!tokenData) {
    throw new AuthError("Something goes wrong, try again please");
  }
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });
  if (!userData) {
    throw new AuthError("Something goes wrong, try again please");
  }

  const user = await UserSchema.findOne({ email: userData.data.email });
  if (user) {
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_SECRET,
      { expiresIn: "30d" }
    );
    return res.redirect(
      `${process.env.FRONTEND_URL}?token=${token}&refreshToken=${refreshToken}`
    );
  }

  const password = uuidv4();
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new UserSchema({
    name: userData.data.name,
    email: userData.data.email,
    password: hashPassword,
  });

  const savedUser = await newUser.save();
  const token = jwt.sign({ _id: savedUser._id }, process.env.SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(
    { _id: savedUser._id },
    process.env.REFRESH_SECRET,
    { expiresIn: "30d" }
  );
  return res.redirect(
    `${process.env.FRONTEND_URL}?token=${token}&refreshToken=${refreshToken}`
  );
};

module.exports = googleRedirect;
