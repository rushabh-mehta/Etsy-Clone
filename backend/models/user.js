const con = require("../db");

const tableName = "user";

class User{

    static addUser = async ({name})=>{
        return new Promise((resolve, reject)=>{
            const sqlQuery = `INSERT INTO ${tableName} (name) VALUES ("${name}")`;
            con.query(sqlQuery,(error, results)=>{
                if(error){
                    console.log(error);
                    return reject(error);
                }
                console.log("ADD USER RESULTS: ", results);
                return resolve(results);
            });
        });
    }

    static addUser = async ({name})=>{
        return new Promise((resolve, reject)=>{
            const sqlQuery = `INSERT INTO ${tableName} (name) VALUES ("${name}")`;
            con.query(sqlQuery,(error, results)=>{
                if(error){
                    console.log(error);
                    return reject(error);
                }
                console.log("ADD USER RESULTS: ", results);
                return resolve(results);
            });
        });
    }

}

module.exports.User = User;