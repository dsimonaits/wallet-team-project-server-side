const joi = require("joi");

const validationCreateTransaction = joi.object({
  type: joi.boolean().required(),
  sum: joi.number().not(0).required(),
  category: joi.string(),
  date: joi.date().required(),
  comment: joi.string(),
});

module.exports = validationCreateTransaction;
