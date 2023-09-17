// const catchAsync = (controller) => (req, res, next) =>
//   Promise.resolve(controller(req, res)).catch(next);

// module.exports = catchAsync;

// const catchAsync = (controller) => (req, res, next) => {
//   controller(req, res, next).catch((error) => {
//     controller(req, res).catch(next);
//   });
// };

const catchAsync = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

module.exports = catchAsync;
