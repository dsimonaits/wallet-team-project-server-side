const Joi = require("joi");
// const { WrongParametersError } = require("../../helpers/errors");

const schemaValidate = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  password: Joi.string()
    .regex(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .min(5)
    .max(15)
    .required(),
  repeat_password: Joi.ref("password"),

  token: [Joi.string(), Joi.number()],

  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

module.exports = schemaValidate;
// const schema = Joi.object({
//   password: Joi.string()
//     .regex(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)
//     .min(6)
//     .max(16)
//     .required(),
//   email: Joi.string()
//     .email({
//       minDomainSegments: 2,
//     })
//     .required(),
// });

// const registerValidator = (req, res, next) => {
//   try {
//     const { error } = schema.validate(req.body);
//     const response = (errorName, text) => {
//       throw new WrongParametersError(
//         `Must be a valid ${errorName}. ${text}`,
//         "Bad request"
//       );
//     };

//     if (error) {
//       switch (error.details[0].context.key) {
//         case "password":
//           return response(
//             error.details[0].context.key,
//             "Password should contain at least one number and one special character, with length between 6-16 characters."
//           );
//         case "email":
//           return response(error.details[0].context.key);

//         default:
//           return res.status(400).json({ error: error.details[0].message });
//       }
//     }
//   } catch (error) {
//     next(error);
//   }

//   next();
// };

// module.exports = registerValidator;
