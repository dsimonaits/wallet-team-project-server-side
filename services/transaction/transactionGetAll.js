const { TransactionSchema } = require("../../models/transaction");

const transactionGetAll = async (owner, page) => {
  const transactionPerPage = 5;
  return await TransactionSchema.find({ owner })
    .sort({ date: -1 })
    .skip(page * transactionPerPage)
    .limit(transactionPerPage);
};

module.exports = transactionGetAll;
