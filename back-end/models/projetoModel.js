const dbConnection = require("../db/conn.js");
class projetoModel {
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

  apiCreate(newprojeto) {
    const sql = 'INSERT INTO projetos (name, descricao) VALUES (?, ?)';
    const values = [
      newprojeto.name,
      newprojeto.description,
    ]
    return this.executeSQL(sql, values);
  }
  
}
module.exports = new projetoModel();