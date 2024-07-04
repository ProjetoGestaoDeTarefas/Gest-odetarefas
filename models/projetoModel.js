const dbConnection = require("../db/dbConnection");
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

  // ----------------------------------------------------------------------------------------------
  // Integração API
  // ----------------------------------------------------------------------------------------------

  apiReadList() {
    const sql =
      "SELECT t.descricao,s.descricao,t.start_date, t.end_date FROM projetos t INNER JOIN status s on (s.id = t.status_id)";
    return this.executeSQL(sql);
  }

  apiRead(id) {
    const sql =
      "SELECT t.descricao,s.descricao,t.start_date, t.end_date FROM projetos t INNER JOIN status s on (s.id = t.status_id) WHERE id = ?";
    return this.executeSQL(sql, id);
  }

  apiCreate(newprojeto) {
    const sql =
      "INSERT INTO projetos (id, descricao, membro_id, start_date) VALUES (?,?,1,?,CURRENT_DATE)";
    const values = [
      newprojeto.id,
      newprojeto.descricao,
      newprojeto.membro_id,
      newprojeto.start_date,
    ];
    return this.executeSQL(sql, values);
  }

  apiUpdate(updatedprojeto, id) {
    const sql = "UPDATE projetos SET ? WHERE id = ?";
    return this.executeSQL(sql, [updatedprojeto, id]);
  }

  apiDelete(id) {
    const sql = "DELETE FROM projetos WHERE id = ?";
    return this.executeSQL(sql, id);
  }

  // ----------------------------------------------------------------------------------------------
  // Integração Front End x Back End
  // ----------------------------------------------------------------------------------------------

  readList() {
    const sql = `
        SELECT 
            p.id, 
            p.name,
            p.descricao,  
            DATE_FORMAT(p.start_date, '%d/%m/%Y') AS start_date, 
            DATE_FORMAT(p.end_date, '%d/%m/%Y') AS end_date 
        FROM 
            projetos p 
        
    `;
    return this.executeSQL(sql);
  }

  read(id) {
    const sql =
      "SELECT id, descricao, DATE_FORMAT(start_date, '%d/%m/%Y') as start_date, DATE_FORMAT(end_date, '%d/%m/%Y') as end_date FROM projetos WHERE id = ?";
    return this.executeSQL(sql, [id]);
  }

  readEquipes() {
    const sql = `
        SELECT 
          e.id,
          e.name
        FROM 
          equipes e
          LEFT JOIN projetos p ON e.id = p.id
        WHERE 
          p.id IS NULL;
    `;
    return this.executeSQL(sql);
  }

  
  create(newprojeto) {
    const sql1 =
      `INSERT INTO projetos (id, name, descricao, start_date) VALUES (?, ?, ?, CURRENT_DATE);`;
    const values1 = [
      newprojeto.id,
      newprojeto.nome,
      newprojeto.descricao,
    ]
    return this.executeSQL(sql1, values1)
    };

  update(updatedprojeto, id) {
    let sql = ''; 
    let values = ''; 
    console.log(updatedprojeto.status,updatedprojeto, this.getCurrentDateTime )
    if(updatedprojeto.status == '4'){
      sql = "UPDATE projetos SET descricao = ?, status_id = ?, end_date = ? WHERE id = ?"; 
      values = [updatedprojeto.descricao, updatedprojeto.status, this.getCurrentDateTime(), id];
    }else if(updatedprojeto.end_date==''|| updatedprojeto.end_date== null ){
      sql = "UPDATE projetos SET descricao = ?, status_id = ?,end_date = ? WHERE id = ?"; 
      values = [updatedprojeto.descricao, updatedprojeto.status,null, id];
    }else{
      sql = "UPDATE projetos SET descricao = ?, status_id = ?, end_date = ? WHERE id = ?"; 
      values = [updatedprojeto.descricao, updatedprojeto.status, updatedprojeto.end_date, id];
    }
    return this.executeSQL(sql, values); 
  }

  delete(id) {
    const sql = "DELETE FROM projetos WHERE id = ?";
    return this.executeSQL(sql, id);
  }
  search(pesquisa) {
    const sql = `
        SELECT 
            t.id, 
            t.descricao AS descricao, 
            s.descricao AS status, 
            DATE_FORMAT(t.start_date, '%d/%m/%Y') AS start_date, 
            DATE_FORMAT(t.end_date, '%d/%m/%Y') AS end_date 
        FROM 
            projetos t 
        INNER JOIN status s ON s.id = t.status_id
        WHERE 
            t.id = ? OR                                                                                 
            t.descricao LIKE ? OR 
            s.descricao LIKE ? OR 
            DATE_FORMAT(t.start_date, '%d/%m/%Y') LIKE ? OR 
            DATE_FORMAT(t.end_date, '%d/%m/%Y') LIKE ?
    `;
    return this.executeSQL(sql, [
      pesquisa,
      pesquisa,
      pesquisa,
      pesquisa,
      pesquisa,
    ]);
  }
  getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
module.exports = new projetoModel();
