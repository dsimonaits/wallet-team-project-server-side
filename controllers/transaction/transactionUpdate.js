const { transactionUpdate } = require("../../services/transaction");
const { responseOk } = require("../../helpers/responses");
const { WrongParametersError } = require("../../helpers/errors");

const transactionUpdateCtrl = async (req, res) => {
  const userId = req.user._id;
  const data = await transactionUpdate(
    req.body,
    req.params.transactionId,
    userId
  );

  if (!req.params.transactionId) {
    throw new WrongParametersError("missed transaction ID");
  }

  res.status(200).json(responseOk("success", 200, "Transaction updated", data));
};

module.exports = transactionUpdateCtrl;
