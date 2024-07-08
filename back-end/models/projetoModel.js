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
    const sql = 'INSERT INTO projetos (name, descricao, start_date, end_date) VALUES (?, ?, ?, ?)';
    const values = [
      newprojeto.name,
      newprojeto.description,
      newprojeto.startDate,
      newprojeto.endDate,
    ]
    return this.executeSQL(sql, values);
  }
  apiList() {
    const sql = `
        SELECT 
          p.id,
          p.name,
          p.descricao,
          p.start_date,
          p.end_date,
        FROM 
          projetos p
    `;
    return this.executeSQL(sql);
  }
  
}
module.exports = new projetoModel();

//          COUNT(t.projeto_id) as total_tarefas
