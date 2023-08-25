class AuthError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class Unauthorized extends AuthError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
class Conflict extends AuthError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  AuthError,
  Unauthorized,
  Conflict,
};
