const con = require("../db");

const tableName = "user";

class User{

    static addUser = async ({name, email, password})=>{
        return new Promise((resolve, reject)=>{
            const sqlQuery = `INSERT INTO ${tableName} (name,email,password) VALUES ("${name}")`;
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

    static checkUserExists = async ({email})=>{
        return new Promise((resolve, reject) => {
            const sqlQuery = `select * from ${tableName} WHERE email="${email}"`;
            console.log("SQL: ", sqlQuery);
            con.query(sqlQuery, (error, results) => {
                if (error) {
                console.log(error);
                return reject(error);
                }
                console.log("USER EXISTS RESULTS: ", results);
                return resolve(results);
            });
            });
    }

}

module.exports.User = User;