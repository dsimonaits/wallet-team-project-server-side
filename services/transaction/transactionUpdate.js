const { getUserData } = require("../../helpers/responses");
const { TransactionSchema } = require("../../models/transaction");
const { transactionCountBalance } = require("./transactionCountBalance");

const transactionUpdate = async (data, transactionId, userId) => {
  const transaction = await TransactionSchema.findOne({ _id: transactionId });
  if (transaction.type !== data.type && data.sum === transaction.sum) {
    await transactionCountBalance(data.type, data.sum * 2, transaction.owner);
  } else if (transaction.type !== data.type && data.sum !== transaction.sum) {
    await transactionCountBalance(
      !transaction.type,
      transaction.sum,
      transaction.owner
    );
    await transactionCountBalance(data.type, data.sum, transaction.owner);
  } else if (transaction.sum !== data.sum) {
    await transactionCountBalance(
      !transaction.type,
      transaction.sum,
      transaction.owner
    );
    await transactionCountBalance(data.type, data.sum, transaction.owner);
  }
  await TransactionSchema.findByIdAndUpdate(transactionId, data);
  const newTransaction = await TransactionSchema.findById(transactionId);
  const user = await getUserData(userId);
  const updatedTransaction = { newTransaction, user: user.balance };
  return updatedTransaction;
};

module.exports = transactionUpdate;
