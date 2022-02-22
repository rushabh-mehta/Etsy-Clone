const con = require("../db");


const tableName = "user";

class User{

    static addUser = async ({id,name, email, password})=>{
        try{
            return new Promise((resolve, reject)=>{
                try{
                    const sqlQuery = `INSERT INTO ${tableName} (id,name,email,password) VALUES ("${id}","${name}","${email}","${password}")`;
                    con.query(sqlQuery,(error, results)=>{
                        if(error){
                            console.log(error);
                            return reject(error);
                        }
                        console.log("ADD USER RESULTS: ", results);
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

    static checkExists = async ({email})=>{
        return new Promise((resolve, reject) => {
            const sqlQuery = `select * from ${tableName} WHERE email="${email}"`;
            console.log("SQL: ", sqlQuery);
            con.query(sqlQuery, (error, results) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }
                console.log("USER EXISTS RESULTS: ", results);
                let userObj = {};
                if(results && results.length){
                    userObj.userFound = true;
                    userObj.user = results[0];
                }else{
                    userObj.userFound = false; 
                }
                return resolve(userObj);
            });
        });
    }

}

module.exports.User = User;