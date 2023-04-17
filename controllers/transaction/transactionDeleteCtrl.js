const { transactionDelete } = require("../../services/transaction");
const { responseOk } = require("../../helpers/responses");
const { WrongParametersError } = require("../../helpers/errors");

const transactionDeleteCtrl = async (req, res, next) => {
  const userId = req.user._id;
  const transactionId = req.body._id;
  if (!transactionId) {
    throw new WrongParametersError("missed transaction ID");
  }
  const data = await transactionDelete(req.body, userId);
  res.status(200).json(responseOk("success", 200, "Transaction deleted", data));
};

module.exports = transactionDeleteCtrl;
