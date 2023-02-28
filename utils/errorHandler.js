const { RequestError } = require("./errors");

const errorHandler = (error, req, res, next) => {
  if (error instanceof RequestError) {
    return res.status(error.status).json({
      status: "error",
      code: error.status,
      message: error.message,
      data: null,
    });
  }

  const response = {
    status: "Internal Server Error",
    code: 500,
    message: error.message,
    data: null,
  };

  return res.status(500).json(response);
};

module.exports = errorHandler;
