const { transactionDelete } = require("../../services/transaction");
const { responseOk } = require("../../helpers/responses");

const transactionDeleteCtrl = async (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
  console.log(req.body);
  await transactionDelete(req.body, userId);
  res.status(200).json(responseOk("success", 200, "Transaction deleted"));
};

module.exports = transactionDeleteCtrl;
