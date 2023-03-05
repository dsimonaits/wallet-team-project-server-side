const Joi = require("joi");
const { WrongParametersError } = require("../../helpers/errors");

const schema = Joi.object({
  password: Joi.string()
    .regex(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .min(6)
    .max(16)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const loginValidator = (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    const response = (errorName) => {
      throw new WrongParametersError(`Must be a valid ${errorName}`);
    };

    if (error) {
      switch (error.details[0].context.key) {
        case "password":
          return response(error.details[0].context.key);
        case "email":
          return response(error.details[0].context.key);

        default:
          return res.status(400).json({ error: error.details[0].message });
      }
    }
  } catch (error) {
    next(error);
  }

  next();
};

module.exports = loginValidator;
