const jwt = require("jsonwebtoken");

const validateRefreshToken = (refreshToken) => {
  try {
    const userData = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
};

module.exports = validateRefreshToken;
