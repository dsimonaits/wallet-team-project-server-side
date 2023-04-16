const Joi = require("joi");

const schemaValidate = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,16}$/)
    .max(15)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

module.exports = schemaValidate;
