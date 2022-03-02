const con = require("../db");


const tableName = "cart";

class Cart{

    static addItem = async ({userId, itemId, orderQuantity})=>{
        try{
            return new Promise((resolve, reject)=>{
                try{
                    const sqlQuery = `INSERT INTO ${tableName} (userId, itemId, orderQuantity) VALUES ('${userId}', '${itemId}', '${orderQuantity}')`;
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
}

module.exports.Cart = Cart;