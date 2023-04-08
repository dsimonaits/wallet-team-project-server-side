const { transactionGetCategory } = require("../../services/transaction");
const { responseOk } = require("../../helpers/responses");

const transactionCreateCtrl = async (req, res, next) => {
  const data = await transactionGetCategory();
  res.status(200).json(responseOk("success", 201, "Category", data.category));
};

module.exports = transactionCreateCtrl;
