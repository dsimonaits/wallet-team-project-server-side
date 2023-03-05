class RequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends RequestError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotFound extends RequestError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = {
  RequestError,
  WrongParametersError,
  NotFound,
};
