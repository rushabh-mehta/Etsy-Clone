const { FavoriteItem } = require("../mongo_services/favoriteitem");

const addFavoriteItem = async (msg,callback) => {
    const response = {};
    const data = msg.body;
    try{
        const favoriteItem = await FavoriteItem.addItem(data);
        response.favoriteItem = favoriteItem;
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

const removeFavoriteItem = async (msg,callback) => {
    const response = {};
    const data = msg.body;
    try{
        const removeItem = await FavoriteItem.removeItem(data);
        response.removeItem = removeItem;
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

const getUserFavoriteItems = async (msg,callback) => {
    const response = {};
    const data = {};
    data.userId = msg.userId;
    try{
        const favoriteItemResult = await FavoriteItem.getFavoriteItems(data);
        response.favoriteItems = favoriteItemResult;
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

const getUserFilteredFavoriteItems = async (msg,callback) => {
    const response = {};
    const data = msg.body;
    try{
        const itemsResult = await FavoriteItem.getFilteredFavoriteItems(data);
        response.items = itemsResult;
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
    if (msg.path === "add_favorite_item") {
    addFavoriteItem(msg, callback);
  }else if(msg.path === "remove_favorite_item"){
    removeFavoriteItem(msg, callback);
  }else if(msg.path === "get_user_favorite_item"){
    getUserFavoriteItems(msg,callback);
  }else if(msg.path === "get_user_filtered_favorite_item"){
    getUserFilteredFavoriteItems(msg,callback);
  }
}

exports.handle_request = handle_request;