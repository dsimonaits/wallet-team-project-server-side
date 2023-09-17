// const catchAsync = (controller) => (req, res, next) =>
//   Promise.resolve(controller(req, res)).catch(next);

// module.exports = catchAsync;

const catchAsync = (controller) => (req, res, next) => {
  controller(req, res, next).catch((error) => {
    return res.status(error.status).json({
      code: error.status,
      ResponseBody: { message: error.message },
    });
  });
};

module.exports = catchAsync;
