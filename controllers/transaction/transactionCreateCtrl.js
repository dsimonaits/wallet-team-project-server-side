const { transactionCreate } = require("../../services/transaction");
const { validationCreateTransaction } = require("../../helpers/validation");
const { responseOk } = require("../../helpers/responses");
const { WrongParametersError } = require("../../helpers/errors");

const transactionCreateCtrl = async (req, res, next) => {
  const userId = req.user._id;
  await validationCreateTransaction.validateAsync(req.body).catch((error) => {
    throw new WrongParametersError(error.message);
  });

  const data = await transactionCreate(req.body, userId);
  res.status(201).json(responseOk("success", 201, "Transaction saved", data));
};

module.exports = transactionCreateCtrl;
