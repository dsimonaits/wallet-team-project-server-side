const signupController = require("./signupController");
const usersController = require("./usersController");
const refreshTokenController = require("./refreshTokenController");
const loginController = require("./loginController");
const logoutController = require("./logoutController");
const currentUserController= require('./currentUserController')
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");
module.exports = {
  signupController,
  usersController,
  refreshTokenController,
  loginController,
  logoutController,
  currentUserController,
  googleAuth,
  googleRedirect,
};
