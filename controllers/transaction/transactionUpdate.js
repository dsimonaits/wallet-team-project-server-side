const { transactionUpdate } = require("../../services/transaction");

const transactionUpdateCtrl = async (req, res) => {
  const updatedTransaction = await transactionUpdate(
    req.body,
    req.params.transactionId
  );

  res.json({ message: { updatedTransaction } });
};

module.exports = transactionUpdateCtrl;
