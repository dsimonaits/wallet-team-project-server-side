const { NotFound } = require("../../helpers/errors");
const { getUserData } = require("../../helpers/responses");
const { TransactionSchema } = require("../../models/transaction");
const { transactionCountBalance } = require("./transactionCountBalance");

const transactionDelete = async ({ _id }, owner) => {
  const transaction = await TransactionSchema.findById({ _id, owner });
  if (!transaction) {
    throw new NotFound("transaction is not found");
  }
  await transactionCountBalance(!transaction.type, transaction.sum, owner);
  await TransactionSchema.findByIdAndDelete({ _id, owner });
  const user = await getUserData(owner);
  return { balance: user.balance, sum: transaction.sum };
};

module.exports = transactionDelete;
