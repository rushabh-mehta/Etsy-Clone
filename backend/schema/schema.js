const graphql = require('graphql');
const {User} = require('../services/user.js');
const {Item} = require('../services/item.js');
const encrypt = require("../services/encrypt");
const jwt = require("jsonwebtoken");
const config =  require('config');
const { Cart } = require("../services/cart");
const { Shop } = require("../services/shop");
const { Order } = require("../services/order");


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
});

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
});

const ShopType = new GraphQLObjectType({
    name: 'Shop',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        owner: { type: UserType },
        displayPicture: { type: GraphQLString },
    })
});

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        displayPicture: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        quantity: {type: GraphQLInt},
        salesCount: { type:GraphQLInt},
        shop: { type:GraphQLString }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        profilePicture: { type: GraphQLString },
        country: { type: GraphQLID },
        currency: { type: GraphQLID },
        about: {type: GraphQLString },
        address : { type:GraphQLString},
        city: { type:GraphQLString },
        date: { type: GraphQLString},
        gender: { type:GraphQLString },
        phone: { type:GraphQLString },
        token: { type:GraphQLString },
    })
});

const CountryType = new GraphQLObjectType({
    name: 'Country',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
});

const CurrencyType = new GraphQLObjectType({
    name: 'Currency',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        symbol: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: {
        user : {
            type: UserType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                const result = await User.getUserById(args);
                console.log(result);
                return result.user;
            }
        },
        getcart : {
            type: new GraphQLList(ItemType),
            args: { userId: { type: GraphQLString } },
            async resolve(parent, args) {
                const result = await Cart.getCartItems(args);
                console.log(result);
                return result;
            }
        },
        getshop : {
            type: ShopType,
            args: { userId: { type: GraphQLString } },
            async resolve(parent, args) {
                const result = await Shop.getUserShop(args);
                console.log(result);
                return result;
            }
        },
        getuser : {
            type: UserType,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                const result = await User.getUserById(args);
                console.log(result);
                return result;
            }
        },
        getorder:{
            type: new GraphQLList(ItemType) ,
            args: { userId: { type: GraphQLString } },
            async resolve(parent, args) {
                const order = await Order.getOrderItems(args);
                console.log(order);
                return order;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        items: {
            type: new GraphQLList(ItemType),
            args: {
                id: { type: GraphQLID },
            },
            resolve: async (parent, args) => {
                const itemsResult = await Item.getOtherItems(args);
                console.log(itemsResult);
                return itemsResult;
            }
        },
        createuser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },

            },
            resolve: async (parent, args) => {
                console.log("here");
                const {name,email,password} = args;
                const userRegObj = {name,email,password};
                const response = {};
                if(userRegObj.name && userRegObj.email && userRegObj.password){
                    try{
                        const exists = await User.checkExists(userRegObj);
                        if(exists && exists.userFound){
                            return {};
                        }
                        const encryptedPassword = await encrypt.cryptPassword(password);
                        userRegObj.password = encryptedPassword;
                        userRegObj.country = "623bc75595f732ed8d44697a";
                        userRegObj.currency = "623bc6d795f732ed8d446943";
                        userRegObj.profilePicture = "c392af743cdddf42b260faffad353a3d";
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
                        userRegObj._id = result._id;
                        userRegObj.id = result._id;
                        console.log(userRegObj);
                        return userRegObj;
                    }catch(e){
                        console.error(e);
                        return {};
                    }
                }else{
                    return {};
                }
            }
        },
        additem:{
            type: ItemType,
            args: {
                name: { type: GraphQLString },
                displayPicture: { type: GraphQLString }, 
                category: { type: GraphQLString },
                description: { type: GraphQLString },
                price: { type: GraphQLString },
                quantity: { type: GraphQLInt },
                salesCount: { type: GraphQLInt },
                shopId: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                console.log(args);
                const itemResult= await Item.addItem(args);
                console.log(itemResult);
                return itemResult;
            }
        },
        edititem:{
            type: ItemType,
            args: {
                name: { type: GraphQLString },
                displayPicture: { type: GraphQLString }, 
                category: { type: GraphQLString },
                description: { type: GraphQLString },
                price: { type: GraphQLString },
                quantity: { type: GraphQLInt },
                salesCount: { type: GraphQLInt },
                shopId: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                console.log(args);
                const itemResult= await Item.editItem(args);
                console.log(itemResult);
                return itemResult;
            }
        },
        addcartitem:{
            type: ItemType,
            args: {
                userId: { type: GraphQLString },
                itemId: { type: GraphQLString }, 
                orderQuantity: { type: GraphQLInt },
            },
            resolve: async (parent, args) => {
                console.log(args);
                const itemResult= await Cart.addItem(args);
                console.log(itemResult);
                return itemResult;
            }
        },
        removecartitem:{
            type: ItemType,
            args: {
                id: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                console.log(args);
                const itemResult = await Cart.removeItem(args);
                console.log(itemResult);
                return itemResult;
            }
        },
        login:{
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve: async(parent,args)=>{
                const {email,password} = args;
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
                                return user;
                            }else{
                                return {};
                            }
                        }else{
                            return {}; 
                        }
                    }catch(e){
                        return {};
                    }
                }else{
                    return {};
                }
            }
        },
        placeOrder:{
            type: new GraphQLList(ItemType),
            args: {
                items: { type: new GraphQLList(ItemType) }
            },
            resolve: async(parent,args)=>{
                console.log(args);
                const order = await Order.placeOrder(args);
                console.log(order);
                return order;
            }
        },
        edituser:{
            type: UserType,
            args: { 
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                profilePicture: { type: GraphQLString },
                country: { type: GraphQLID },
                currency: { type: GraphQLID },
                about: {type: GraphQLString },
                address : { type:GraphQLString},
                city: { type:GraphQLString },
                date: { type: GraphQLString},
                gender: { type:GraphQLString },
                phone: { type:GraphQLString },
                token: { type:GraphQLString },
             },
            async resolve(parent, args) {
                const result = await User.editUser(args);
                console.log(result);
                return result;
            }
        }    
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;
