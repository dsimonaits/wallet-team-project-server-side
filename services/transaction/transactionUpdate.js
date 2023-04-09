const { TransactionSchema } = require("../../models/transaction");

const transactionUpdate = async ({ sum, date, comment }, transactionId) => {
  await TransactionSchema.findByIdAndUpdate(transactionId, {
    sum,
    date,
    comment,
  });

  return await TransactionSchema.findById(transactionId);
};

module.exports = transactionUpdate;
