const axios = require("axios");
const pLimit = require("p-limit");

const concurrencyLimit = 1;

const limit = pLimit({
  concurrency: concurrencyLimit,
  interval: 300000,
});

const STORAGE_KEY = "cachedResponse";

const currenciesApi = async () => {
  let cachedResponse = null;

  try {
    const storageResponse = localStorage.getItem(STORAGE_KEY);
    if (storageResponse) {
      cachedResponse = JSON.parse(storageResponse);
    }
  } catch (error) {
    console.log(error.message);
  }

  if (cachedResponse) {
    return cachedResponse;
  }

  await limit();

  try {
    const response = await axios("https://api.monobank.ua/bank/currency");

    localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = currenciesApi;
