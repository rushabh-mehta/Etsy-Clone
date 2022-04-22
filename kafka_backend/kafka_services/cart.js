const { Cart } = require("../mongo_services/cart");


const addItem = async (msg,callback) => {
    const response = {};
    const data = {};
    const item = msg.body;
    try{
        const addItem = await Cart.addItem(item);
        if(addItem.itemExists){
            response.success = false;
            response.itemExists = true;
            response.error = "Item already added";
            response.status = 400;
            callback(null,response);
        }else{
            response.addedItem = addItem;
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

const deleteItem = async (msg,callback) => {
    const response = {};
    const data = {};
    const item = msg.body;
    try{
        const removeItem = await Cart.removeItem(item);
        response.removedItem = removeItem;
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

const getCart = async (msg,callback)=>{
    const response = {};
    const data = {};
    data.userId = msg.userId;
    try{
        const items = await Cart.getCartItems(data);
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

const updateItemQuantity = async (msg,callback)=>{
    const response = {};
    const data = msg.body;
    try{
        const updatedItem = await Cart.updateItemOrderQuantity(data);
        response.updatedItem = updatedItem;
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

const updateItemGift = async (msg,callback)=>{
    const response = {};
    const data = msg.body;
    try{
        const updatedItem = await Cart.updateItemOrderGift(data);
        response.updatedItem = updatedItem;
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
  if (msg.path === "add_item") {
    addItem(msg, callback);
  }else if (msg.path === "delete_item") {
    deleteItem(msg, callback);
  }else if(msg.path === "get_cart"){
    getCart(msg, callback);
  }else if(msg.path === "update_item_quantity"){
    updateItemQuantity(msg, callback);
  }else if(msg.path === "update_item_gift"){
    updateItemGift(msg, callback);
  }
}

exports.handle_request = handle_request;