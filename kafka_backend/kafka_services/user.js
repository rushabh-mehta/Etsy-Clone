const { User } = require("../mongo_services/user");

const currencyUpdate = async (msg,callback) =>{
    const data = msg.body;
    const response = {};
    try{
        const updatedResult = await User.updateUserCurrency(data);
        if(updatedResult && updatedResult.userEdited){
            const userData = {};
            userData.id = data.userId;
            const findResult = await User.getUserById(userData);
            response.success = true;
            response.user = findResult.user;
            response.status = 200;
            callback(null,response);
        }else{
            response.success = false;
            response.error = "User not found";
            response.status = 400;
            callback(null,response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = 500;
        callback(null,response);
    }
}


const getUser = async (msg,callback) =>{
    const id = msg.id;
    const user = {id};
    const response = {};
    try{
        const result = await User.getUserById(user);
        if(result && result.userFound && result.user){
            response.success = true;
            response.user = result.user;
            response.status = 200;
            callback(null,response);
        }else{
            response.success = false;
            response.error = "User not found";
            response.status = 400;
            callback(null,response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = 500;
        callback(null,response);
    }
}

const editUser = async (msg,callback) =>{
    const id = msg.id;
    const user = msg.user;
    const response = {};
    try{
        const updatedResult = await User.editUser(user);
        if(updatedResult && updatedResult.userEdited){
            const findResult = await User.getUserById(user);
            response.success = true;
            response.user = findResult.user;
            response.status = 200;
            callback(null,response);
        }else{
            response.success = false;
            response.error = "User not found";
            response.status = 400;
            callback(null,response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = 500;
        callback(null,response);
    }
}



function handle_request(msg, callback) {
  console.log(msg);
  if (msg.path === "currency_update") {
    currencyUpdate(msg, callback);
  }else if (msg.path === "get_user") {
    getUser(msg, callback);
  }else if (msg.path === "edit_user") {
    editUser(msg, callback);
  }
}

exports.handle_request = handle_request;