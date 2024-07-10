const dbConnection = require("../db/conn.js");
class tarefaModel {
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
      "SELECT t.title, t.description, t.start_date, t.end_date, t.priority FROM tarefas t;";
      // "SELECT t.title, t.description, t.start_date, t.end_date, t.priority FROM tarefas t INNER JOIN status s on (s.id = t.status_id)";
    return this.executeSQL(sql);
  }

  apiRead(id) {
    const sql =
      "SELECT t.title, t.description, t.start_date, t.end_date, t.priority FROM tarefas t";
    return this.executeSQL(sql, id);
  }

  apiCreate(newtarefa) {
    const sql =
      "INSERT INTO tarefas (title, description, start_date, end_date) VALUES (?,?,?,?)";
      // "INSERT INTO tarefas (title, description, start_date, end_date, priority) VALUES (?,?,?,?,?)";
    const values = [
      newtarefa.name,
      newtarefa.description,
      newtarefa.startDate,
      newtarefa.endDate,
      // newtarefa.priority
    ];
    return this.executeSQL(sql, values);
  }

  apiUpdate(updatedtarefa, id) {
    const sql = "UPDATE tarefas SET ? WHERE id = ?";
    return this.executeSQL(sql, [updatedtarefa, id]);
  }

  apiDelete(id) {
    const sql = "DELETE FROM tarefas WHERE id = ?";
    return this.executeSQL(sql, id);
  }

  // ----------------------------------------------------------------------------------------------
  // Integração Front End x Back End
  // ----------------------------------------------------------------------------------------------

  readList() {
    const sql = `
        SELECT 
            t.id, 
            t.title AS title, 
            t.description AS description, 
            t.start_date AS start_date, 
            t.end_date AS end_date, 
            t.priority AS priority 
        FROM 
            tarefas t 
    `;
    return this.executeSQL(sql);
  }

  read(id) {
    const sql =
      "SELECT id, title, description, start_date, end_date, priority FROM tarefas WHERE id = ?";
    return this.executeSQL(sql, [id]);
  }

  create(newtarefa) {
    const sql =
      "INSERT INTO tarefas (title, description, start_date, end_date, priority) VALUES (?,?,?,?,?)";
    const values = [
      newtarefa.title,
      newtarefa.description,
      newtarefa.start_date,
      newtarefa.end_date,
      newtarefa.priority,
    ];
    return this.executeSQL(sql, values);
  }

  update(updatedtarefa, id) {
    const sql = "UPDATE tarefas SET ? WHERE id = ?";
    return this.executeSQL(sql, [updatedtarefa, id]);
  }

  delete(id) {
    const sql = "DELETE FROM tarefas WHERE id = ?";
    return this.executeSQL(sql, id);
  }
  search(pesquisa) {
    const sql = `
        SELECT 
            t.id, 
            t.title AS title, 
            t.description AS description, 
            t.start_date AS start_date, 
            t.end_date AS end_date, 
            t.priority AS priority 
        FROM 
            tarefas t 
        INNER JOIN status s ON s.id = t.status_id
        WHERE 
            t.id = ? OR                                                                                 
            t.title LIKE ? OR 
            t.description LIKE ? OR 
            t.start_date LIKE ? OR 
            t.end_date LIKE ?
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
module.exports = new tarefaModel();
