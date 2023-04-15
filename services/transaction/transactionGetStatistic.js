const { TransactionSchema } = require("../../models/transaction");

const transactionGetStatistic = async (_id, { month, year }) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const result = await TransactionSchema.aggregate([
    {
      $match: {
        owner: _id,
        type: false,
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: { category: "$category" },
        totalSum: { $sum: "$sum" },
      },
    },
    {
      $project: { _id: 0, category: "$_id.category", totalSum: 1 },
    },
  ]);

  const transaction = await TransactionSchema.aggregate([
    {
      $match: {
        owner: _id,
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: { type: "$type" },
        income: { $sum: "$sum" },
      },
    },
    {
      $project: {
        _id: 0,
        type: "$_id.type",
        sum: "$income",
      },
    },
  ]);
  return { result, transaction };
};

module.exports = transactionGetStatistic;
