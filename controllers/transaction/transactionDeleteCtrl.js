const { transactionDelete } = require("../../services/transaction");
const { responseOk } = require("../../helpers/responses");

const transactionDeleteCtrl = async (req, res, next) => {
  const userId = req.user._id;
  await transactionDelete(req.body, userId);
  res.status(201).json(responseOk("success", 200, "Transaction deleted"));
};

module.exports = transactionDeleteCtrl;
