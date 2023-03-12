const catchAsync = (controller) => (req, res, next) =>
  Promise.resolve(controller(req, res)).catch(next);

module.exports = catchAsync;
