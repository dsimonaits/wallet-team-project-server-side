const jwt = require("jsonwebtoken");

const validateAccessToken = (accessToken) => {
  try {
    const userData = jwt.verify(accessToken, process.env.SECRET);
    return userData;
  } catch (error) {
    return null;
  }
};

module.exports = validateAccessToken;
