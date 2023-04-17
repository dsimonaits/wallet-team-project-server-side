const getUserData = require("../../helpers/responses/getUserData");
const { TransactionSchema } = require("../../models/transaction");
const { transactionCountBalance } = require("./transactionCountBalance");

const transactionUpdate = async (
  { sum, date, comment, type },
  transactionId,
  userId
) => {
  const transaction = await TransactionSchema.findOne({ _id: transactionId });
  if (transaction.type !== type) {
    transactionCountBalance(type, sum * 2, transaction.owner);
  }
  await TransactionSchema.findByIdAndUpdate(transactionId, {
    sum,
    date,
    comment,
    type,
  });

  const newTransaction = await TransactionSchema.findById(transactionId);
  const user = await getUserData(userId);
  return { newTransaction, balance: user.balance };
};

module.exports = transactionUpdate;
