const express =  require('express');
const cors = require('cors');
const config = require("config");
const mysql = require("mysql");
const signup = require("./routes/signup");

// const db = mysql.createConnection({
//     host: config.get("DB.host"),
//     user: config.get("DB.username"),
//     password: config.get("DB.password"),
//     port: config.get("DB.port"),
//     database: config.get("DB.database"),
// });

// db.connect((err)=>{
//  if(err){
//      throw err;
//  }else{
//      console.log("mysql connected");
//  }
// });

const app = express();



app.use(cors());
app.use(express.json());

app.listen(3000, ()=>{
    console.log('Example app listening on port 3000');
})

app.use('/api/signup',signup);

