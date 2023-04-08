const { TransactionSchema } = require("../../models/transaction");
const { WrongParametersError } = require("../../helpers/errors");

const transactionCreate = async ({ type, sum, category, date, comment }) => {
  const newTransaction = new TransactionSchema({
    type,
    sum,
    category,
    date,
    comment,
  });
  await newTransaction.save().catch((error) => {
    throw new WrongParametersError(error.message, error.path);
  });
  return { type, sum, category, date, comment, _id: newTransaction._id };
};
module.exports = transactionCreate;
