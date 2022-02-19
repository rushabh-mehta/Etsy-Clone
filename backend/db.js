const mysql  = require('mysql');
const config =  require('config');

module.exports = mysql.createPool({
  host: config.get("DB.host"),
  user: config.get("DB.username"),
  password: config.get("DB.password"),
  port: config.get("DB.port"),
  database: config.get("DB.database"),
  connectionLimit: 500,
});