const con = require("../db");


const tableName = "favoriteitem";
const itemTableName = "item";

class FavoriteItem{

    static getFavoriteItems = async ({userId})=>{
        return new Promise((resolve, reject) => {
            const sqlQuery = `select ${tableName}.id as favoriteItemId, ${itemTableName}.id as itemId, ${itemTableName}.name as itemName, ${itemTableName}.quantity as itemQuantity, ${itemTableName}.description as itemDescription, ${itemTableName}.category as itemCategory, ${itemTableName}.price as itemPrice from ${tableName} JOIN ${itemTableName} ON ${tableName}.item=${itemTableName}.id WHERE user='${userId}'`;
            con.query(sqlQuery, (error, results) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    static addItem = async ({userId, itemId})=>{
        try{
            return new Promise((resolve, reject)=>{
                try{
                    const sqlQuery = `INSERT INTO ${tableName} (user, item) VALUES ('${userId}', '${itemId}')`;
                    con.query(sqlQuery,(error, results)=>{
                        if(error){
                            console.log(error);
                            return reject(error);
                        }
                        console.log("ADD Item RESULTS: ", results);
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

    static removeItem = async ({userId,itemId})=>{
        try{
            return new Promise((resolve, reject)=>{
                try{
                    const sqlQuery = `DELETE from ${tableName} WHERE user='${userId}' AND item='${itemId}'`;
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

    static getFilteredFavoriteItems = async ({searchQuery})=>{
        return new Promise((resolve, reject) => {
            let sqlQuery = `select * from ${tableName} JOIN ${itemTableName} ON ${tableName}.itemId=${itemTableName}.id WHERE ${itemTableName}.name LIKE '%${searchQuery}%'`;
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

module.exports.FavoriteItem = FavoriteItem;