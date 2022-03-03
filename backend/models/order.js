const { connect } = require("../db");
const con = require("../db");


const tableName = "orders";
const orderItemTableName = "orderitem";

class Order{

    static getOrderItems = async ({userId})=>{
        return new Promise((resolve, reject) => {
            const getUserOrdersSqlQuery = `select * from ${tableName} WHERE userId='${userId}'`;
            con.query(getUserOrdersSqlQuery, (error, results) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }else if(results && results.length){
                    const orderIds = results.map((eachOrder)=>{
                        return eachOrder.orderId;
                    });
                    let orderIdsQuery = "(";
                    orderIds.forEach((orderId,index) => {
                        if(orderIds.length-1==index){
                            orderIdsQuery+="\'"+orderId+"\'";
                        }else{
                            orderIdsQuery+="\'"+orderId+"\'"+", ";
                        }
                    });
                    orderIdsQuery+=")";
                    const sqlQuery = `select * from ${orderItemTableName} where orderId IN ${orderIdsQuery}`;
                    con.query(sqlQuery, (error, results) => {
                        if (error) {
                            console.log(error);
                            return reject(error);
                        }else if(results){
                            console.log(results);
                            return resolve(results);
                        }else{
                            return reject("Some unexpected error occurred!");
                        }
                    });
                }else{
                    resolve([]);
                }
            });
        });
    }
}

module.exports.Order = Order;