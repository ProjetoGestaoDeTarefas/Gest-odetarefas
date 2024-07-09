const dbConnection = require("../db/conn.js");

// Obter o timestamp atual e formatar a data
const getCurrentFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

class UserModel {

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

    create(dto) {
        const sql = 'INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?)';
        const createdAt = getCurrentFormattedDate();
        const values = [
            dto.name,
            dto.email,
            dto.password,
            'member',
            createdAt
        ]

        return this.executeSQL(sql, values);
    }


    getAll() {
        const sql = 'SELECT name, email, password, role, created_at FROM users';
        return this.executeSQL(sql);
    }

    getFindEmail(email) {
        const sql = `SELECT name, email, password, role, created_at FROM users WHERE email = '${email}'`;
        return this.executeSQL(sql, email);
    }

}

module.exports = new UserModel();