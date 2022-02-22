const express =  require('express');
const cors = require('cors');
const config = require("config");
const mysql = require("mysql2");
const auth = require("./middleware/auth");
const signup = require("./controllers/signup");
const home = require("./controllers/home");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, ()=>{
    console.log('Example app listening on port 3000');
})


app.use('/api/signup',signup);
app.use('/api/home',home);

