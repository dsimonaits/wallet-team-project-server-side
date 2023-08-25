class AuthError extends Error {
  constructor(message) {
    super();
    this.status = 400;
    this.message = message;
  }
}
class Unauthorized extends AuthError {
  constructor(message, statusType) {
    this.status = 401;
    this.statusType = statusType;
    this.message = message;
  }
}
class Conflict extends AuthError {
  constructor(message, statusType) {
    this.status = 409;
    this.statusType = statusType;
    this.message = message;
  }
}

module.exports = {
  AuthError,
  Unauthorized,
  Conflict,
};
