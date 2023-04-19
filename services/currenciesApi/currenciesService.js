const axios = require("axios");

const currenciesApi = async () => {
  const response = await axios("https://api.monobank.ua/bank/currency");
  return response.data;
};

module.exports = currenciesApi;
