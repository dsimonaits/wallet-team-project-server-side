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

class ServerDown extends RequestError {
  constructor(message) {
    super(message);
    this.status = 503;
  }
}

module.exports = {
  RequestError,
  WrongParametersError,
  ServerDown,
};
