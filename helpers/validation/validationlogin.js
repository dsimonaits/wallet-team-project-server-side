const Joi = require("joi");
const { AuthError } = require("../../helpers/errors");

const validationAuth = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/
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
