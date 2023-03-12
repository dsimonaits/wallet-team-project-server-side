const {
  WrongParametersError,
  RequestError,
  NotFound,
} = require("./requestErrors");
const { AuthError, Unauthorized, Conflict } = require("./authErrors");
const ErrorHandler = require("./errorHandler");
const catchAsync = require("./catchAsync");

module.exports = {
  WrongParametersError,
  RequestError,
  NotFound,
  AuthError,
  Unauthorized,
  Conflict,
  ErrorHandler,
  catchAsync,
};
