const Joi = require("joi");
const { WrongParametersError } = require("../../utils/errors");

const schema = Joi.object({
  name: Joi.string()
    .regex(/^[A-Z]|[A-Z]+ [A-Z]+$/i)
    .min(3)
    .max(20)
    .required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .min(6)
    .max(12)
    .pattern(/^[0-9]+$/)
    .required(),
  favorite: Joi.boolean(),
});

const createValidator = (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    const response = (errorName) => {
      throw new WrongParametersError(`Must be a valid ${errorName}`);
    };

    if (error) {
      if (error.details[0].type === "any.required") {
        switch (error.details[0].context.key) {
          case "name":
            return response(error.details[0].context.key);
          case "phone":
            return response(error.details[0].context.key);
        }
      }
      return res.status(400).json({ error: error.details[0].message });
    }
  } catch (error) {
    next(error);
  }

  next();
};

module.exports = createValidator;
