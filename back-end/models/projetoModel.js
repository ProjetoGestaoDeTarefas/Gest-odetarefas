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
          id,
          name,
          descricao,
          start_date,
          end_date
        FROM 
          projetos
    `;
    return this.executeSQL(sql);
  }
  
  apiDelete(id) {
    const sql = "DELETE FROM projetos WHERE id = ?";
    return this.executeSQL(sql, id);
  }

  apiUpdate(updatedtarefa, id) {
    const sql = "UPDATE tarefas SET ? WHERE id = ?";
    return this.executeSQL(sql, [updatedtarefa, id]);
  }

  apiSearch(pesquisa) {
    const sql = `
        SELECT 
            id, 
            name, 
            descricao, 
            start_date, 
            end_date,
            created_by
            
        FROM 
            projetos 

        WHERE 
            id = ? OR                                                                                 
            title LIKE ? OR 
            description LIKE ? OR 
            start_date LIKE ? OR 
            end_date LIKE ? OR
            created_by LIKE ?
    `;
    return this.executeSQL(sql, [
      pesquisa,
      pesquisa,
      pesquisa,
      pesquisa,
      pesquisa,
      pesquisa,
    ]);
  }

}
module.exports = new projetoModel();

//          COUNT(t.projeto_id) as total_tarefas
