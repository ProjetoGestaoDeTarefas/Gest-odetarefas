const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "127.0.0.1",       
  port: 3306,             
  user: "root",            
  password: "admin",       
  database: "db_helpDesk"
});

module.exports = db;