const { RequestError } = require("./requestErrors");
const { AuthError } = require("./authErrors");

const errorHandler = (error, req, res, next) => {
  if (error instanceof RequestError) {
    return res.status(error.status || 500).json({
      error: {
        message: error.message,
        status: error.status,
      },
    });
  }

  if (error instanceof AuthError) {
    return res.status(error.status || 500).json({
      error: {
        message: error.message,
        status: error.status,
      },
    });
  }

  const response = {
    status: "Internal Server Error",
    code: 500,
    ResponseBody: { message: error.message },
  };

  res.status(500).json(response);
};

module.exports = errorHandler;
