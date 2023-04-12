const { TransactionSchema } = require("../../models/transaction");

const transactionUpdate = async (
  { sum, date, comment, type },
  transactionId
) => {
  await TransactionSchema.findByIdAndUpdate(transactionId, {
    sum,
    date,
    comment,
    type,
  });

  return await TransactionSchema.findById(transactionId);
};

module.exports = transactionUpdate;
