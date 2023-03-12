const Joi = require("joi");
const { WrongParametersError } = require("../../helpers/errors");

const schema = Joi.object({
  name: Joi.string()
    .trim()
    .regex(/^[A-Z]|[A-Z]+ [A-Z]+$/i)
    .min(3)
    .max(20),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  phone: Joi.string()
    .trim()
    .min(6)
    .max(12)
    .pattern(/^[0-9]+$/),
  favorite: Joi.boolean(),
});

const contactUpdateValidator = (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    const response = (errorName) => {
      throw new WrongParametersError(`Must be a valid value ${errorName}`);
    };

    if (error) {
      switch (error.details[0].context.key) {
        case "name":
          return response(error.details[0].context.key);
        case "email":
          return response(error.details[0].context.key);
        case "phone":
          return response(error.details[0].context.key);

        case "favorite":
          return response(error.details[0].context.key);
        default:
          return res.status(400).json({
            status: "error",
            code: 400,
            message: error.details[0].message,
          });
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = contactUpdateValidator;
