const Joi = require("joi");

// const complexityOptions = {
//   min: 5,
//   max: 12,
//   upperCase: 1,
//   numeric: 1,
  
// };

const schemaValidate = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  
   password: Joi.string()
    // .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
     .regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

module.exports = schemaValidate;
