const axios = require('axios');

const currenciesApi = async () => {
try {
    const response = await axios("https://api.monobank.ua/bank/currency")

    console.log(response)

    return response.data
} catch (error) {
    console.log(error.message)
}
   
};

module.exports = currenciesApi;
