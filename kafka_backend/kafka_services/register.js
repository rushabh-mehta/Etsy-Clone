const jwt = require("jsonwebtoken");
const config =  require('config');
const { User } = require("../mongo_services/user");
const encrypt = require("../mongo_services/encrypt");

const register = async (msg,callback) => {
    const {name,email,password} = msg.body;
    const userRegObj = {name,email,password};
    const response = {};
    if(userRegObj.name && userRegObj.email && userRegObj.password){
        try{
            const exists = await User.checkExists(userRegObj);
            if(exists && exists.userFound){
                response.success = false;
                response.error = "User already exists";
                response.status = 400;
                callback(null,response);
            }

            const encryptedPassword = await encrypt.cryptPassword(password);
            userRegObj.password = encryptedPassword;
            userRegObj.country = "623bc75595f732ed8d44697a";
            userRegObj.currency = "623bc6d795f732ed8d446943";
            userRegObj.profilePicture = "3d07ffec355de8f5d8a483d2085b4a4e";
            const result = await User.addUser(userRegObj);
            delete userRegObj.password;
            // Create token
            const token = jwt.sign(
                userRegObj,
                config.get("jwtPrivateKey"),
                {
                    expiresIn: "24h",
                }
            );
            userRegObj.token = token;
            response.user = userRegObj;
            response.success = true;
            response.status = 200;
            response.result = result;
            callback(null,response);
        }catch(e){
            console.log(e);
            response.success = false;
            response.error = "Some error occurred. Please try again later";
            response.status = 500;
            callback(null,response);
        }
    }else{
        console.log(e);
        response.success = false;
        response.error = "Invalid credentials";
        response.status = 400;
        callback(null,response);
    }
}

function handle_request(msg, callback) {
  console.log(msg);
  if (msg.path === "register") {
    register(msg, callback);
  }
}

exports.handle_request = handle_request;