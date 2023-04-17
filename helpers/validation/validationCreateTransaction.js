const joi = require("joi");

const validationCreateTransaction = joi.object({
  type: joi.boolean().required(),
  sum: joi.number().not(0).precision(2).required(),
  category: joi.string().default("Income"),
  date: joi.date().required(),
  comment: joi.string().default("").empty(""),
});

module.exports = validationCreateTransaction;
