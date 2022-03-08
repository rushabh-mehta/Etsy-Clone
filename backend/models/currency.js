const con = require("../db");


const tableName = "currency";

class Currency{

    static getCurrencies = async ({userId})=>{
        return new Promise((resolve, reject) => {
            const sqlQuery = `select name,id from ${tableName}`;
            con.query(sqlQuery, (error, results) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

}

module.exports.Currency = Currency;