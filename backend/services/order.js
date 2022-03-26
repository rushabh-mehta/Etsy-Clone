var mongoose = require('mongoose');
const OrderModel = require('../mongo_models/order.js');
const OrderItemModel = require('../mongo_models/orderitem.js');
const Item = require('../mongo_models/item.js');

class Order{

    static getOrderItems = async ({userId,skip,limit})=>{
        try{
            const query = {
                "user": mongoose.Types.ObjectId(userId)
            };
            let moreAvailable = false;
            let orders = await OrderModel.find(query);
            orders = JSON.parse(JSON.stringify(orders));
            const response = {};
            if(orders?.length){
                const orderIds = results.map((eachOrder)=>{
                    return eachOrder.orderId;
                });
                if(orderIds.length>limit){
                    moreAvailable = true;
                }
                orderIds.pop();
                const orderitemsFindQuery = {
                    order:{$in:orderIds}
                }

                const orderitemsSortQuery = {
                    date:-1
                }
                let orderItems = await OrderItemModel.find(orderitemsFindQuery).sort(orderitemsSortQuery);
                orderItems = JSON.parse(JSON.stringify(orderItems));
                orderItems.forEach((eachItem)=>{
                    let date = new Date(eachItem.date);
                    let year = date.getFullYear();
                    let month = date.getMonth()+1;
                    let dt = date.getDate();
                    if (dt < 10) {
                    dt = '0' + dt;
                    }
                    if (month < 10) {
                    month = '0' + month;
                    }
                    eachItem.date = month+"/"+dt+"/"+year;
                });
                const groupedOrders = {};
                orderItems.forEach((eachItem)=>{
                    if(eachItem.orderId in orders){
                        groupedOrders[eachItem.orderId].push(result);
                    }else{
                        groupedOrders[eachItem.orderId] = [result];
                    }
                });
                response.orders = groupedOrders;
                response.moreAvailable = moreAvailable;
            }else{
                response.orders = {};
                response.moreAvailable = false;
                return response;
            }
        }catch(err){
            console.log(err);
            throw new Error("Some unexpected error occurred while getting all order items");
        }
    }

    static placeOrder = async ({userId})=>{
        let session;
        try{
            session = await mongoose.startSession();
            session.startTransaction();
            try{
                const cartItemQuery = {
                    "user": mongoose.Types.ObjectId(userId)
                };
                let cartItems = await CartModel.find(cartItemQuery);
                cartItems = JSON.parse(JSON.stringify(cartItems));
                if(cartItems?.length){
                    const cartItemIds = cartItems.map((eachCartItem)=>{
                        return mongoose.Types.ObjectId(eachCartItem.item);
                    });
                    const itemQuery = {
                        "_id": {$in:cartItemIds}
                    };
                    const items = await ItemModel.find(query);
                    items = JSON.parse(JSON.stringify(items));
                    if(items?.length){
                        const updatedItems = [];
                        cartItems.forEach((eachCartItem)=>{
                            let item = items.filter((eachItem)=>{
                                return eachCartItem.itemId==eachItem.itemId;
                            });
                            item = item[0];
                            if(item.itemQuantity<eachCartItem.orderQuantity){
                                return reject("Item out of stock");
                            }else{
                                item.itemQuantity-=eachCartItem.orderQuantity;
                                item.itemSalesCount+=eachCartItem.orderQuantity;
                                item.itemOrderQuantity=eachCartItem.orderQuantity;
                                item.itemDate = new Date();
                                item.itemGift = eachCartItem.gift;
                                item.itemCartDescription = eachCartItem.description;
                                updatedItems.push(item);
                            }
                        });
                        const createOrderQuery = {
                            user:userId,
                        };
                        const order = new OrderModel(createOrderQuery);
                        const orderCreateResult = await order.save();
                        if(orderCreateResult){
                            const createOrderItemsQuery = [];
                            updatedItems.forEach((eachItem)=>{
                                const query = {
                                    "insertOne":{
                                        "document":eachItem,
                                    }
                                };
                                createOrderItemsQuery.push(query);
                            });
                            const orderItemsCreateResult = await OrderItemModel.bulkWrite(createOrderItemsQuery);
                            if(orderItemsCreateResult){
                                const updateItemsQuery = [];
                                updatedItems.forEach((eachItem)=>{
                                    const query = {
                                        "updateOne":{
                                            "filter":{
                                                "_id":mongoose.Types.ObjectId(eachItem.id)
                                            },
                                            "update":{
                                                "quantity":eachItem.itemQuantity,
                                                "salesCount":eachItem.itemSalesCount
                                            }
                                        }
                                    };
                                    updateItemsQuery.push(query);
                                });
                                const itemsUpdateResult = await ItemModel.bulkWrite(updateItemsQuery);
                                if(itemsUpdateResult){
                                    const deleteCartItemsQuery = {
                                        "user":mongoose.Types.ObjectId(userId),
                                    }
                                    const deleteCartItemsResult = await FavoriteItemModel.deleteMany(deleteCartItemsQuery);
                                    if(deleteCartItemsResult){
                                        await session.commitTransaction();
                                        const response = {};
                                        response.orderPlaced = true;
                                        return response;
                                    }else{
                                        throw new Error("Some unexpected error occurred while deleting cart items");
                                    }
                                }else{
                                    throw new Error("Some unexpected error occurred while updating items");
                                }
                            }else{
                                throw new Error("Some unexpected error occurred while creating order items");
                            }
                        }else{
                            throw new Error("Some unexpected error occurred while creating order");
                        }
                    }else{
                    throw new Error("Some unexpected error occurred while getting items to place order");
                    }
                }else{
                    throw new Error("Some unexpected error occurred while getting cart items to place order");
                }
            }catch(err){
                console.log(err);
                throw new Error("Some unexpected error occurred while placing order");
            }
        }catch(err){
            await session.abortTransaction();
        }finally{
            session.endSession();
        }
    }
}

module.exports.Order = Order;