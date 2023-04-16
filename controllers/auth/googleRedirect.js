const axios = require("axios");
const queryString = require("node:querystring");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const { AuthError } = require("../../helpers/errors");
const UserSchema = require("../../models/userSchema");
const { userDto } = require("../../helpers/dtos");
const { tokenService, saveToken } = require("../../services/auth/tokenService");

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
    const newUserDto = userDto(user);
    const tokens = await tokenService(newUserDto);
    await saveToken(newUserDto._id, tokens.refreshToken);
    return res.redirect(
      `${process.env.FRONTEND_URL}?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`
    );
  }

  const password = uuidv4();
  const activationLink = uuidv4();
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await UserSchema.create({
    name: userData.data.name,
    email: userData.data.email,
    password: hashPassword,
    activationLink,
  });

  const newUserDto = userDto(newUser);

  const tokens = await tokenService(newUserDto);
  await saveToken(newUserDto._id, tokens.refreshToken);
  return res.redirect(
    `${process.env.FRONTEND_URL}?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`
  );
};

module.exports = googleRedirect;
