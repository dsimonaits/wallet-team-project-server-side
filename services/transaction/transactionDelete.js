const { TransactionSchema } = require("../../models/transaction");

const transactionDelete = async ({ _id }, owner) => {
  await TransactionSchema.findByIdAndDelete({ _id }, owner);
};

module.exports = transactionDelete;
