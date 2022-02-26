const con = require("../db");


const tableName = "item";

class Item{

    static getShopItems = async ({shopId})=>{
        return new Promise((resolve, reject) => {
            const sqlQuery = `select * from ${tableName} WHERE shop='${shopId}'`;
            con.query(sqlQuery, (error, results) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    static addItem = async ({name, displayPicture, category, description, price, quantity, salesCount, shopId})=>{
        try{
            return new Promise((resolve, reject)=>{
                try{
                    const sqlQuery = `INSERT INTO ${tableName} (name, displayPicture, category, description, price, quantity, salesCount, shop) VALUES ('${name}', '${displayPicture}', '${category}', '${description}', '${price}', '${quantity}', '${salesCount}', '${shopId}')`;
                    
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

    static editItem = async ({id, name, displayPicture, category, description, price, quantity})=>{
        try{
            return new Promise((resolve, reject)=>{
                try{
                    const sqlQuery = `update ${tableName} set name = '${name}', displayPicture = '${displayPicture}', category = '${category}', description = '${description}', price = '${price}', quantity = '${quantity}' where id = '${id}'`;
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

    static getOtherItems = async ({shop})=>{
        return new Promise((resolve, reject) => {
            const sqlQuery = `select * from ${tableName} WHERE shop!='${shop}'`;
            con.query(sqlQuery, (error, results) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    static getOtherFilteredItems = async ({shop,searchQuery,minPrice,maxPrice,inStock,sortPrice,sortBy})=>{
        return new Promise((resolve, reject) => {
            let sqlQuery = `select * from ${tableName} WHERE shop!='${shop}'`;
            if(searchQuery){
                sqlQuery+=` AND name LIKE '%${searchQuery}%'`; 
            }
            if(minPrice){
                sqlQuery+=` AND price>=${minPrice}`; 
            }
            if(maxPrice){
                sqlQuery+=` AND price<=${maxPrice}`; 
            }
            if(inStock){
                sqlQuery+=` AND quantity>salesCount`;
            }
            if(sortBy==="price"){
                sqlQuery+=` ORDER BY price`;
            }
            if(sortBy==="quantity"){
                sqlQuery+=` ORDER BY quantity`;
            }
            if(sortBy==="salesCount"){
                sqlQuery+=` ORDER BY salesCount`;
            }
            console.log(sqlQuery);
            con.query(sqlQuery, (error, results) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }
                console.log(results);
                return resolve(results);
            });
        });
    }

}

module.exports.Item = Item;