const joi = require("joi");
const { WrongParametersError } = require("../../helpers/errors");

const validationUpdateTransaction = (req, res, next) => {
  const schema = joi.object({
    type: joi.boolean(),
    sum: joi.number().not(0),
    category: joi.string(),
    date: joi.date(),
    comment: joi.string(),
    id: joi.string(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new WrongParametersError(validationResult.error.details));
  }

  next();
};

module.exports = validationUpdateTransaction;
