const createValidator = require("./create.validator");
const registerValidator = require("./register.validator");
const contactUpdateValidator = require("./contactUpdate.validator");
const loginValidator = require("./login.validator");
const userUpdateValidator = require("./userUpdate.validator");
const resendVerificationValidator = require("./resendVerification.validator");
const contactIdValidator = require("./contactId.validator");

module.exports = {
  createValidator,
  registerValidator,
  contactUpdateValidator,
  loginValidator,
  userUpdateValidator,
  resendVerificationValidator,
  contactIdValidator,
};
