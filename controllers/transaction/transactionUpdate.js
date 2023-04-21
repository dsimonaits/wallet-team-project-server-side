const { transactionUpdate } = require("../../services/transaction");

const transactionUpdateCtrl = async (req, res) => {
  const userId = req.user._id;
  const updatedTransaction = await transactionUpdate(
    req.body,
    req.params.transactionId,
    userId
  );
  res.status(200).json(updatedTransaction);
};

module.exports = transactionUpdateCtrl;
