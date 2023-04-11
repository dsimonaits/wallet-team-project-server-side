const currenciesApi = require("../../services/currenciesApi/currenciesApi");
const { responseOk } = require("../../helpers/responses");

const currenciesApiCtrl = async (req, res, next) => {
  const data = await currenciesApi();
  res.status(200).json(responseOk("success", 200, "Currencies received", data));
};

module.exports = currenciesApiCtrl;
