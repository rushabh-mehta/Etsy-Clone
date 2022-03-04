const con = require("../db");


const tableName = "cart";
const itemTableName = "item";

class Cart{

    static addItem = async ({userId, itemId})=>{
        try{
            return new Promise((resolve, reject)=>{
                try{
                    const checkItemExistsQuery = `SELECT * from ${tableName} where userId ='${userId}' AND itemId='${itemId}'`;
                    con.query(checkItemExistsQuery,(error,results)=>{
                        if(error){
                            console.log(error);
                            return reject(error);
                        }else if(results && results.length){
                            const data = {};
                            data.itemExists = true;
                            return reject(data);
                        }else{
                            const sqlQuery = `INSERT INTO ${tableName} (userId, itemId) VALUES ('${userId}', '${itemId}')`;
                            con.query(sqlQuery,(error, results)=>{
                                if(error){
                                    console.log(error);
                                    return reject(error);
                                }
                                console.log("ADD Item RESULTS: ", results);
                                return resolve(results);
                            });
                        }
                    });
                }catch(e){
                    console.log(e);
                    return reject(e);
                }
            });
        }catch(e){
            console.log(e);
            throw Error(e);
        }
    }

    static removeItem = async ({id})=>{
        try{
            return new Promise((resolve, reject)=>{
                try{
                    const sqlQuery = `DELETE from ${tableName} WHERE id='${id}'`;
                    con.query(sqlQuery,(error, results)=>{
                        if(error){
                            console.log(error);
                            return reject(error);
                        }
                        console.log("DELETE Item RESULTS: ", results);
                        return resolve(results);
                    });
                }catch(e){
                    console.log(e);
                    return reject(e);
                }
            });
        }catch(e){
            console.log(e);
            throw Error(e);
        }
    }

    static getCartItems = async ({userId})=>{
        return new Promise((resolve, reject) => {
            const sqlQuery = `select ${itemTableName}.name as itemName, ${itemTableName}.displayPicture as itemDisplayPicture, ${itemTableName}.category as category, ${itemTableName}.description as itemDescription, ${itemTableName}.price as itemPrice, ${itemTableName}.quantity as itemQuantity, ${itemTableName}.salesCount as itemSalesCount, ${tableName}.id as cartId from ${tableName} INNER JOIN ${itemTableName} ON ${tableName}.itemId=${itemTableName}.id WHERE ${tableName}.userId='${userId}'`;
            con.query(sqlQuery, (error, results) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }else if(results){
                    return resolve(results);
                }else{
                    return reject("Some unexpected error occurred!");
                }
            });
        });
    }
}

module.exports.Cart = Cart;