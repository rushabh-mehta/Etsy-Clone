const { Currency } = require("../mongo_services/currency");

const getAllCurrencies = async (msg,callback) => {
    const response = {};
    const data = {};
    try{
        const currencies = await Currency.getCurrencies(data);
        response.currencies = currencies;
        response.success = true;
        response.status = 200;
        callback(null,response);
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = 500;
        callback(null,response);
    }
}

const getSpecificCurrency = async (msg,callback) => {
    const response = {};
    const data = {};
    data.currencyId = msg.currencyId;
    try{
        const currency = await Currency.getCurrency(data);
        response.currency = currency;
        response.success = true;
        response.status = 200;
        callback(null,response);
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = 500;
        callback(null,response);
    }
}

function handle_request(msg, callback) {
  console.log(msg);
  if (msg.path === "get_all_currency") {
    getAllCurrencies(msg, callback);
  }else if (msg.path === "get_specific_currency") {
    getSpecificCurrency(msg, callback);
  }
}

exports.handle_request = handle_request;