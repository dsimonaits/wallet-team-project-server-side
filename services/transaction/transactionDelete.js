const TransactionSchema = require("../../models/transactionSchema");

const transactionDelete = async ({ _id }) => {
  await TransactionSchema.findByIdAndDelete({ _id });
  // нужно ли делать проверку если транзакция есть?
};

module.exports = transactionDelete;
