const { WrongParametersError } = require("../../helpers/errors");
const { transactionGetStatistic } = require("../../services/transaction");

const transactionGetStatisticCtrl = async (req, res, next) => {
  const userId = req.user._id;
  const { month, year } = req.body;
  if (!month || !year) {
    throw new WrongParametersError();
  }
  const data = await transactionGetStatistic(userId, { month, year });
  res.status(200).json(data);
};

module.exports = transactionGetStatisticCtrl;
