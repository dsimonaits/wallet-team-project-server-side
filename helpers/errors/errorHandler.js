const { RequestError } = require("./requestErrors");
const { AuthError } = require("./authErrors");

const errorHandler = (error, req, res, next) => {
  if (error instanceof RequestError) {
    return res.status(error.status).json({
      status: error.statusType,
      code: error.status,
      ResponseBody: { message: error.message },
    });
  }

  if (error instanceof AuthError) {
    return res.status(error.status).json({
      status: error.statusType,
      code: error.status,
      ResponseBody: { message: error.message },
    });
  }

  const response = {
    status: "Internal Server Error",
    code: 500,
    message: error.message,
    ResponseBody: { message: error.message },
  };

  return res.status(500).json(response);
};

module.exports = errorHandler;
