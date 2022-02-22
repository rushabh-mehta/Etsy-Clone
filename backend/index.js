const express =  require('express');
const cors = require('cors');
const config = require("config");
const mysql = require("mysql2");
const auth = require("./middleware/auth");
const register = require("./controllers/register");
const login = require("./controllers/login");
const home = require("./controllers/home");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, ()=>{
    console.log('Example app listening on port 3000');
})


app.use('/api/register',register);
app.use('/api/login',login);
app.use('/api/home',home);

