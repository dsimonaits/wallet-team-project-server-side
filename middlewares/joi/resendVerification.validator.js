const Joi = require("joi");
const { WrongParametersError } = require("../../helpers/errors");

const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
});

const resendVerificationValidator = (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    const response = (errorName) => {
      throw new WrongParametersError(
        `Must be a valid value ${errorName}`,
        "Bad request"
      );
    };

    if (error) {
      return res.json(response(error.details[0].context.key));
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerificationValidator;
