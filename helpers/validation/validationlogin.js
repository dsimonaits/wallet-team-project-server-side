const Joi = require("joi");
const { AuthError } = require("../../helpers/errors");

const validationAuth = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,16}$/
    ),
    email: Joi.string().email().required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new AuthError(validationResult.error.details));
  }

  next();
};

module.exports = validationAuth;
