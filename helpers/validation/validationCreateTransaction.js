const joi = require("joi");

const validationCreateTransaction = joi.object({
  type: required(),
  sum: joi.number().not(0).precision(2).required(),
  category: joi.string(),
  date: joi.date().required(),
  comment: joi.string(),
});

module.exports = validationCreateTransaction;
