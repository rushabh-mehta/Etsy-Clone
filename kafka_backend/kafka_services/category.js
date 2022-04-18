const { Category } = require("../mongo_services/category");

const userCategory = async (msg,callback) => {
    const response = {};
    const data = {};
    data.userId = msg.userId;
    try{
        const categories = await Category.getCategories(data);
        response.categories = categories;
        response.success = true;
        response.status = 200;
        callback(null,response);
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = 500;
        callback(null,response);
    }
}

const addCategory = async (msg,callback) => {
    const response = {};
    const data = req.body;
    try{
        const addedCategory = await Category.addCategory(data);
        response.addedCategory = addedCategory;
        response.success = true;
        response.status = 200;
        callback(null,response);
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
  if (msg.path === "user_category") {
    userCategory(msg, callback);
  }
  if (msg.path === "add_category") {
    addCategory(msg, callback);
  }
}

exports.handle_request = handle_request;