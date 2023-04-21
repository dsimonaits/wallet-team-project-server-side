const { transactionUpdate } = require("../../services/transaction");
const { responseOk } = require("../../helpers/responses");

const transactionUpdateCtrl = async (req, res) => {
  const userId = req.user._id;
  const updatedTransaction = await transactionUpdate(
    req.body,
    req.params.transactionId,
    userId
  );
  res
    .status(200)
    .json(responseOk("success", 200, "Transaction saved", updatedTransaction));
};

module.exports = transactionUpdateCtrl;
