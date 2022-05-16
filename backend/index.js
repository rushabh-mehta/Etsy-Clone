const express =  require('express');
const cors = require('cors');
const config = require("config");
const mysql = require("mysql2");
const auth = require("./middleware/auth");
const register = require("./controllers/register");
const login = require("./controllers/login");
const user = require("./controllers/user");
const country = require("./controllers/country");
const shop = require("./controllers/shop");
const category = require("./controllers/category");
const item = require("./controllers/item");
const cart = require("./controllers/cart");
const order = require("./controllers/order");
const favoriteitem = require("./controllers/favoriteitem");
const currency = require("./controllers/currency");
const passport = require('passport');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');



const app = express();


require('./config/passport-config')(passport);



const mongoose = require('mongoose');
const { mongoDB } = require('./config/mongo-config');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};


mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/api/register',register);
app.use('/api/login',login);
app.use('/api/user',user);
app.use('/api/country',country);
app.use('/api/shop',shop);
app.use('/api/category',category);
app.use('/api/item',item);
app.use('/api/cart',cart);
app.use('/api/order',order);
app.use('/api/favoriteitem',favoriteitem);
app.use('/api/currency',currency);

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3001, ()=>{
    console.log('Listening on port 3001');
})

