const { transactionGetStatistic } = require("../../services/transaction");

const transactionGetStatisticCtrl = async (req, res, next) => {
  const userId = req.user._id;
  const body = req.body;
  const data = await transactionGetStatistic(userId, body);
  res.status(200).json(data);
};

module.exports = transactionGetStatisticCtrl;
