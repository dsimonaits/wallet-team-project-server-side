const { RequestError } = require("./requestErrors");
const { AuthError } = require("./authErrors");

const errorHandler = (error, req, res, next) => {
  if (error instanceof RequestError) {
    return res.json({
      error: {
        message: error.message,
        status: error.status,
      },
    });
  }

  if (error instanceof AuthError) {
    return res.json({
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
