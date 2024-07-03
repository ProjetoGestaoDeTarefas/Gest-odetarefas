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
      "SELECT t.descricao,s.descricao,t.dataCadastro, t.dataFinalizado FROM projetos t INNER JOIN status s on (s.id = t.status_id)";
    return this.executeSQL(sql);
  }

  apiRead(id) {
    const sql =
      "SELECT t.descricao,s.descricao,t.dataCadastro, t.dataFinalizado FROM projetos t INNER JOIN status s on (s.id = t.status_id) WHERE id = ?";
    return this.executeSQL(sql, id);
  }

  apiCreate(newprojeto) {
    const sql =
      "INSERT INTO projetos (id, descricao, membro_id, dataCadastro) VALUES (?,?,1,?,CURRENT_DATE)";
    const values = [
      newprojeto.id,
      newprojeto.descricao,
      newprojeto.membro_id,
      newprojeto.datacadastro,
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
            p.nome,
            p.descricao,  
            DATE_FORMAT(p.dataCadastro, '%d/%m/%Y') AS dataCadastro, 
            DATE_FORMAT(p.dataFinalizado, '%d/%m/%Y') AS dataFinalizado 
        FROM 
            projetos p 
        
    `;
    return this.executeSQL(sql);
  }

  read(id) {
    const sql =
      "SELECT id, descricao, status_id, DATE_FORMAT(dataCadastro, '%d/%m/%Y') as dataCadastro, DATE_FORMAT(dataFinalizado, '%d/%m/%Y') as dataFinalizado FROM projetos WHERE id = ?";
    return this.executeSQL(sql, [id]);
  }

  readEquipes() {
    const sql = `
        SELECT 
          e.id,
          e.nome
        FROM 
          equipes e
          LEFT JOIN projetos p ON e.id = p.id
        WHERE 
          p.id IS NULL;
    `;
    return this.executeSQL(sql);
  }

  
  create(newprojeto) {
    return new Promise((resolve, reject) => {
      this.executeSQL('START TRANSACTION')
        .then(() => {
          const sql1 =
            `INSERT INTO projetos (id, nome, descricao, dataCadastro) VALUES (?, ?, ?, CURRENT_DATE);`;
          const values1 = [
            newprojeto.id,
            newprojeto.nome,
            newprojeto.descricao,
          ];
  
          return this.executeSQL(sql1, values1);
        })
        .then(() => {
          const sql2 =
            `INSERT INTO equipes (projeto_id) VALUES (?);`;
          const values2 = [
            newprojeto.equipe.id,
          ];
  
          return this.executeSQL(sql2, values2);
        })
        .then(() => {
          return this.executeSQL('COMMIT');
        })
        .then((results) => {
          resolve(results);
        })
        .catch((error) => {
          this.executeSQL('ROLLBACK')
            .then(() => {
              reject(error);
            });
        });
    });
  }

  update(updatedprojeto, id) {
    let sql = ''; 
    let values = ''; 
    console.log(updatedprojeto.status,updatedprojeto, this.getCurrentDateTime )
    if(updatedprojeto.status == '4'){
      sql = "UPDATE projetos SET descricao = ?, status_id = ?, dataFinalizado = ? WHERE id = ?"; 
      values = [updatedprojeto.descricao, updatedprojeto.status, this.getCurrentDateTime(), id];
    }else if(updatedprojeto.dataFinalizado==''|| updatedprojeto.dataFinalizado== null ){
      sql = "UPDATE projetos SET descricao = ?, status_id = ?,dataFinalizado = ? WHERE id = ?"; 
      values = [updatedprojeto.descricao, updatedprojeto.status,null, id];
    }else{
      sql = "UPDATE projetos SET descricao = ?, status_id = ?, dataFinalizado = ? WHERE id = ?"; 
      values = [updatedprojeto.descricao, updatedprojeto.status, updatedprojeto.dataFinalizado, id];
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
            DATE_FORMAT(t.dataCadastro, '%d/%m/%Y') AS dataCadastro, 
            DATE_FORMAT(t.dataFinalizado, '%d/%m/%Y') AS dataFinalizado 
        FROM 
            projetos t 
        INNER JOIN status s ON s.id = t.status_id
        WHERE 
            t.id = ? OR                                                                                 
            t.descricao LIKE ? OR 
            s.descricao LIKE ? OR 
            DATE_FORMAT(t.dataCadastro, '%d/%m/%Y') LIKE ? OR 
            DATE_FORMAT(t.dataFinalizado, '%d/%m/%Y') LIKE ?
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
