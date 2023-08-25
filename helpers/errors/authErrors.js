class AuthError extends Error {
  constructor(message) {
    super();
    this.status = 400;
    this.message = message;
  }
}
class Unauthorized extends AuthError {
  constructor(message, statusType) {
    super(message);
    this.status = 401;
    this.statusType = statusType;
  }
}
class Conflict extends AuthError {
  constructor(message, statusType) {
    super(message);
    this.status = 409;
    this.statusType = statusType;
  }
}

module.exports = {
  AuthError,
  Unauthorized,
  Conflict,
};
