const { Shop } = require("../mongo_services/shop");

const getUserShop = async (msg,callback) => {
    const response = {};
    const data = {};
    data.userId = msg.userId;
    try{
        const result = await Shop.getUserShop(data);
        if(result && result.shopFound && result.shop){
            response.shop = result.shop;
            response.shopFound = result.shopFound;
            response.success = true;
            response.status = 200;
            callback(null,response);
        }else{
            response.shopFound = result.shopFound;
            response.success = true;
            response.status = 200;
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

const verifyShopName = async (msg,callback) => {
    const response = {};
    const data = {};
    data.shopName = msg.shopName;
    try{
        const result = await Shop.checkNameAvailable(data);
        if(result && result.shopFound && result.shop){
            response.shop = result.shop;
            response.shopFound = result.shopFound;
            response.success = true;
            response.status = 200;
            callback(null,response);
        }else{
            response.shopFound = result.shopFound;
            response.success = true;
            response.status = 200;
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

const createShop = async (msg,callback) => {
    const response = {};
    const data = {};
    data.shopName = msg.shopName;
    data.user = msg.user;
    try{
        const result = await Shop.createShop(data);
        if(result && result.shopCreated && result.shop){
            response.shop = result.shop;
            response.shopCreated = result.shopCreated;
            response.success = true;
            response.status = 200;
            callback(null,response);
        }else{
            response.shopCreated = result.shopCreated;
            response.success = true;
            response.status = 200;
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

const shopHome = async (msg,callback) => {
    const response = {};
    const data = msg.body;
    try{
        const result = await Shop.getShopById(data);
        const itemData = {};
        itemData.shopId = result.shop.id;
        const itemResult = await Item.getShopItems(itemData);
        if(result && result.shopFound && result.shop){
            response.shop = result.shop;
            response.editRights = result.editRights;
            response.shopFound = result.shopFound;
            response.success = true;
            response.status = 200;
            console.log(itemResult);
            response.shopItems = itemResult;
            callback(null,response);
        }else{
            response.shopFound = result.shopFound;
            response.success = true;
            response.status = 200;
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
  if (msg.path === "get_user_shop") {
    getUserShop(msg, callback);
  }else if(msg.path === "verify_shop_name"){
    verifyShopName(msg,callback);
  }else if(msg.path === "create_shop"){
    createShop(msg,callback);
  }else if(msg.path === "shop_home"){
    shopHome(msg,callback);
  }
}

exports.handle_request = handle_request;