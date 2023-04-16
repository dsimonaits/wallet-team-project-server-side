const { TransactionSchema } = require("../../models/transaction");
const { transactionCountBalance } = require("./transactionCountBalance");

const transactionDelete = async ({ _id }, owner) => {
  const transaction = await TransactionSchema.findById({ _id, owner });
  await transactionCountBalance(!transaction.type, transaction.sum, owner);
  await TransactionSchema.findByIdAndDelete({ _id, owner });
};

module.exports = transactionDelete;
