const { Country } = require("../mongo_services/country");

const country = async (msg,callback) => {
    const response = {};
    try{
        const countries = await Country.getCountries();
        response.countries = countries;
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
  if (msg.path === "country") {
    country(msg, callback);
  }
}

exports.handle_request = handle_request;