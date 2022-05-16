const graphql = require('graphql');
const {User} = require('../services/user.js');
const {Item} = require('../services/item.js');
const encrypt = require("../services/encrypt");
const jwt = require("jsonwebtoken");
const config =  require('config');


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
                console.log("herereer");
                const result = await User.getUserById(args);
                console.log(result);
                return result.user;
            }
        },
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
                        userRegObj.profilePicture = "3d07ffec355de8f5d8a483d2085b4a4e";
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
                console.log("efdsgdfgdf");
                const itemResult= await Item.addItem(args);
                console.log(itemResult);
                return itemResult;
            }
        }

        
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;
