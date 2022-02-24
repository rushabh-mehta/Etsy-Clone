const con = require("../db");


const tableName = "shop";

class Shop{

    static getUserShop = async ({userId})=>{
        return new Promise((resolve, reject) => {
            const sqlQuery = `select name,owner,displayPicture from ${tableName} where owner='${userId}'`;
            con.query(sqlQuery, (error, results) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }else if(results && results.length){
                    const queryResult = {};
                    queryResult.shopFound = true;
                    queryResult.shop = results[0];
                    return resolve(queryResult);
                }else{
                    const queryResult = {};
                    queryResult.shopFound = false;
                    return resolve(queryResult);
                }
            });
        });
    }

    static checkNameAvailable = async ({shopName})=>{
        return new Promise((resolve, reject) => {
            const sqlQuery = `select name,owner,displayPicture from ${tableName} where name='${shopName}'`;
            con.query(sqlQuery, (error, results) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }else if(results && results.length){
                    const queryResult = {};
                    queryResult.shopFound = true;
                    queryResult.shop = results[0];
                    return resolve(queryResult);
                }else{
                    const queryResult = {};
                    queryResult.shopFound = false;
                    return resolve(queryResult);
                }
            });
        });
    }

}

module.exports.Shop = Shop;