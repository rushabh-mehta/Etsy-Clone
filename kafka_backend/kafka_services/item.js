const { Item } = require("../mongo_services/item");

const getShopItems = async (msg,callback) => {
    const response = {};
    const data = {};
    data.shopId = msg.shopId;
    try{
        const items = await Item.getShopItems(data);
        response.items = items;
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

const getItem = async (msg,callback) => {
    const response = {};
    const data = {};
    data.itemId = msg.itemId;
    data.userId = msg.userId;
    try{
        const item = await Item.getItem(data);
        response.item = item;
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

const addItem = async (msg,callback)=>{
    const response = {};
    const item = msg.body;
    try{
        const itemResult= await Item.addItem(item);
        response.item = itemResult;
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

const editItem = async(msg,callback)=>{
    const response = {};
    const item = msg.body;
    try{
        const itemResult = await Item.editItem(item);
        response.item = itemResult;
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

const otherItem = async(msg,callback)=>{
    const response = {};
    const data = msg.body;
    try{
        const itemsResult = await Item.getOtherItems(data);
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

const otherItemFilter = async(msg,callback)=>{
    const response = {};
    const data = msg.body;
    try{
        const itemsResult = await Item.getOtherFilteredItems(data);
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
  if (msg.path === "get_shop_items") {
    getShopItems(msg, callback);
  }else if(msg.path === "get_item"){
    getItem(msg, callback);
  }else if(msg.path === "add_item"){
    addItem(msg, callback);
  }else if(msg.path === "edit_item"){
    editItem(msg, callback);
  }else if(msg.path === "other_item"){
    otherItem(msg, callback);
  }else if(msg.path === "other_item_filter"){
    otherItemFilter(msg, callback);
  }
}

exports.handle_request = handle_request;