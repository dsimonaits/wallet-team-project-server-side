const axios = require("axios");

const CURRENCY_CACHE_KEY = "currencyCache";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

const currenciesApi = async () => {
  const cachedResponse = localStorage.getItem(CURRENCY_CACHE_KEY);

  if (cachedResponse) {
    const { data, timestamp } = JSON.parse(cachedResponse);
    const lastRequest = Date.now() - timestamp;

    if (lastRequest < CACHE_TTL) {
      console.log(`Returning cached response (lastRequest: ${lastRequest}ms)`);
      return data;
    }
  }

  try {
    const response = await axios.get("https://api.monobank.ua/bank/currency");
    const responseData = response.data;

    localStorage.setItem(
      CURRENCY_CACHE_KEY,
      JSON.stringify({
        data: responseData,
        timestamp: Date.now(),
      })
    );

    console.log(responseData);

    return responseData;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = currenciesApi;

// const axios = require("axios");
// const pLimit = require("p-limit");

// const concurrencyLimit = 1;

// const limit = pLimit({
//   concurrency: concurrencyLimit,
//   interval: 300000,
// });

// const STORAGE_KEY = "cachedResponse";

// const currenciesApi = async () => {
//   let cachedResponse = null;

//   try {
//     const storageResponse = localStorage.getItem(STORAGE_KEY);
//     if (storageResponse) {
//       cachedResponse = JSON.parse(storageResponse);
//     }
//   } catch (error) {
//     console.log(error.message);
//   }

//   if (cachedResponse) {
//     return cachedResponse;
//   }

//   await limit();

//   try {
//     const response = await axios("https://api.monobank.ua/bank/currency");

//     localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));

//     return response.data;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// module.exports = currenciesApi;
