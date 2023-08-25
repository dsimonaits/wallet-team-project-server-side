const { RequestError } = require("./requestErrors");
const { AuthError } = require("./authErrors");

const errorHandler = (error, req, res, next) => {
  // if (error instanceof RequestError) {
  //   console.log(error);
  //   return res.status(error.status).json({
  //     ResponseBody: { message: error.message },
  //   });
  // }

  // if (error instanceof AuthError) {
  //   console.log(error);
  //   return res.status(error.status).json({
  //     ResponseBody: { message: error.message },
  //   });
  // }

  const response = {
    status: "Internal Server Error",
    code: 500,
    ResponseBody: { message: error.message },
  };

  res.status(500).json(response);
};

module.exports = errorHandler;
