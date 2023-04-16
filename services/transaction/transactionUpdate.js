const { TransactionSchema } = require("../../models/transaction");
const { transactionCountBalance } = require("./transactionCountBalance");

const transactionUpdate = async (
  { sum, date, comment, type },
  transactionId
) => {
  const transaction = await TransactionSchema.findOne({ _id: transactionId });
  if (transaction._id !== transactionId) {
    transactionCountBalance(type, sum * 2, transaction.owner);
  }
  await TransactionSchema.findByIdAndUpdate(transactionId, {
    sum,
    date,
    comment,
    type,
  });

  return await TransactionSchema.findById(transactionId);
};

module.exports = transactionUpdate;
