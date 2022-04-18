const jwt = require("jsonwebtoken");
const config =  require('config');
const { User } = require("../mongo_services/user");
const encrypt = require("../mongo_services/encrypt");

const login = async (msg,callback) => {
    const {email,password} = msg.body;
    const userObj = {email,password};
    const response = {};
    if(userObj.email && userObj.password){
        try{
            const exists = await User.checkExists(userObj);
            if(exists && exists.userFound){
                const passwordMatch = await encrypt.comparePassword(userObj.password, exists.user.password);
                if(passwordMatch){
                    const user = JSON.parse(JSON.stringify(exists.user));
                    delete userObj.password;
                    delete user.password;
                    const token = jwt.sign(
                        userObj,
                        config.get("jwtPrivateKey"),
                        {
                            expiresIn: "24h",
                        }
                    );
                    user.token = token;
                    response.user = user;
                    response.token = token;
                    response.success = true;
                    response.status = 200;
                    callback(null,response);
                }else{
                    response.success = false;
                    response.status = 400;
                    response.error = "Invalid credentials";
                    callback(null,response);
                }
            }else{
                response.success = false;
                response.status = 400;
                response.error = "Invalid credentials";
                callback(null,response);

            }
        }catch(e){
            console.log(e);
            response.success = false;
            response.error = "Some error occurred. Please try again later";
            response.status = 500;
            callback(null,response);
        }
    }else{
        response.success = false;
        response.status = 400;
        response.error = "Invalid credentials";
        callback(null,response);
    }
}

function handle_request(msg, callback) {
  console.log(msg);
  if (msg.path === "login") {
    login(msg, callback);
  }
}

exports.handle_request = handle_request;