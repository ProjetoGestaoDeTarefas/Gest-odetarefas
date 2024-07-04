const mysql = require("mysql");
const sqlConnection = mysql.createConnection({
  host: "127.0.0.1",       
  port: 3306,             
  user: "root",            
  password: "User-12910",       
  database: "db_helpDesk",     
});

module.exports = sqlConnection;


//Default senha: 'admin'