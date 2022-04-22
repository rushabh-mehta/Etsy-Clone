const { Order } = require("../mongo_services/order");

const getUserOrders = async (msg,callback) => {
    const response = {};
    const data = {};
    data.userId = msg.userId;
    data.skip = msg.skip;
    data.limit = msg.limit;
    try{
        const items = await Order.getOrderItems(data);
        response.items = items.orders;
        response.success = true;
        response.moreAvailable = items.moreAvailable;
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


const placeOrder = async (msg,callback) => {
    const response = {};
    const data = msg.body;
    try{
        const result = await Order.placeOrder(data);
        response.result = result;
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
  if (msg.path === "get_user_orders") {
    getUserOrders(msg, callback);
  }else if(msg.path === "place_order"){
    placeOrder(msg, callback);
  }
}

exports.handle_request = handle_request;