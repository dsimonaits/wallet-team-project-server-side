const joi = require("joi");
const { WrongParametersError } = require("../../helpers/errors");

const validationUpdateTransaction = (req, res, next) => {
  const schema = joi.object({
    type: joi.boolean().required(),
    sum: joi.number().not(0).required(),
    date: joi.date().required(),
    comment: joi.string().empty(""),
    category: joi.string().empty(""),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new WrongParametersError(validationResult.error.details));
  }

  next();
};

module.exports = validationUpdateTransaction;
