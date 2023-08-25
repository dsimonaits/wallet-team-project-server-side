class AuthError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}
class Unauthorized extends AuthError {
  constructor(message) {
    super(message, 401);
  }
}
class Conflict extends AuthError {
  constructor(message) {
    super(message, 409);
  }
}

module.exports = {
  AuthError,
  Unauthorized,
  Conflict,
};
