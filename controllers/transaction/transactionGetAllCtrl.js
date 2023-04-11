const { transactionGetAll } = require("../../services/transaction");
const { responseOk } = require("../../helpers/responses");

const transactionGetAllCtrl = async (req, res, next) => {
  const page = req.query.page || 0;
  const userId = req.user._id;
  const data = await transactionGetAll(userId, page);
  res
    .status(200)
    .json(responseOk("success", 200, "List of transactions", data));
};

module.exports = transactionGetAllCtrl;
