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
  apiAdd(newTeam, id) {
    const sql = 'INSERT INTO user_team (start_date, end_date, team_id, member_id) VALUES (?, ?, ?, ?)';
    const values = [
      newTeam.startDate,
      newTeam.endDate,
      id,
      newTeam.id,
    ]
    return this.executeSQL(sql, values);
  }
  apiList() {
    const sql = (`SELECT e.name, COUNT(ut.member_id) AS quantidade_usuarios
  FROM equipes e
  LEFT JOIN user_team ut ON e.id = ut.team_id
  GROUP BY e.name;`)
    return this.executeSQL(sql);
  }




  


  
}
module.exports = new teamModel();