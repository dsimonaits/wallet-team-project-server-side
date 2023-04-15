const signupController = require("./signupController");
const refreshTokenController = require("./refreshTokenController");
const loginController = require("./loginController");
const logoutController = require("./logoutController");
const currentUserController = require("./currentUserController");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");
const activateCtrl = require("./activateCtrl");

module.exports = {
  signupController,
  refreshTokenController,
  loginController,
  logoutController,
  currentUserController,
  googleAuth,
  googleRedirect,
  activateCtrl,
};
