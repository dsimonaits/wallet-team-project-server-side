const { TransactionSchema } = require("../../models/transaction");
const { WrongParametersError } = require("../../helpers/errors");
const { transactionCountBalance } = require("./transactionCountBalance");
const getUserData = require("../../helpers/responses/getUserData");

const transactionCreate = async (
  { type, sum, category, date, comment },
  owner
) => {
  const newTransaction = await TransactionSchema.create({
    type,
    sum,
    category,
    date,
    comment,
    owner,
  });
  await newTransaction.save().catch((error) => {
    throw new WrongParametersError(error.message, error.path);
  });
  transactionCountBalance(type, sum, owner);
  const { balance } = getUserData(owner);
  return {
    type: newTransaction.type,
    sum: newTransaction.sum,
    category: newTransaction.category,
    date: newTransaction.date,
    comment: newTransaction.comment,
    _id: newTransaction._id,
    balance,
  };
};
module.exports = transactionCreate;
