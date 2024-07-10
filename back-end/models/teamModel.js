const dbConnection = require("../db/conn.js");
class teamModel {
  executeSQL(sql, parameters = "") {
    return new Promise(function (resolve, reject) {
      dbConnection.query(sql, parameters, function (error, resposta) {
        if (error) {
          return reject(error);
        }
        return resolve(resposta);
      });
    });
  }

  /////////////////////////////////////////////////

  apiCreate(newTeam) {
    const sql = 'INSERT INTO equipes (name) VALUES (?)';
    const values = [
      newTeam.name,
    ]
    return this.executeSQL(sql, values);
  }
  apiList() {
    const sql = 'SELECT * FROM equipes';
    return this.executeSQL(sql);
  }

  
}
module.exports = new teamModel();