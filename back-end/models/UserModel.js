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

    static executeSQL(sql, parameters = []) {
        return new Promise((resolve, reject) => {
            dbConnection.query(sql, parameters, (error, resposta) => {
                if (error) {
                    return reject(error);
                }
                return resolve(resposta);
            });
        });
    }

    /////////////////////////////////////////////////

    static async create(dto) {
        const sql = 'INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?)';
        const createdAt = getCurrentFormattedDate();
        const values = [
            dto.name,
            dto.email,
            dto.password,
            'member',
            createdAt
        ]

        return await this.executeSQL(sql, values);
    }


    static async getAll() {
        const sql = 'SELECT name, email, password, role, created_at FROM users';
        return await this.executeSQL(sql);
    }

    static async getFindEmail(email) {
        const sql = 'SELECT name, email, password, role, created_at FROM users WHERE email = ?';
        const result = await this.executeSQL(sql, [email]);

        if (result.length > 0) {
            return result[0];
        } else {
            return null;
        }
    }
    static async getFindId(id) {
        const sql = 'SELECT name, email, password, role, created_at FROM users WHERE id = ?';
        const result = await this.executeSQL(sql, [id]);

        if (result.length > 0) {
            return result[0];
        } else {
            return null;
        }
    }

    static async destroy(id) {
        const sql = "DELETE FROM users WHERE id = ?";
        return this.executeSQL(sql, id);
      }

      static async update(updateUser, id) {
        const sql = "UPDATE users SET ? WHERE id = ?";
        return this.executeSQL(sql, [updateUser, id]);
      }
      
      static async updateAdm(id) {
        const sql = "UPDATE users SET role = 'admin' WHERE id = ?";
        return this.executeSQL(sql, [id]);
      }

      static async updatePassword(email, newPassword) {
        const sql = "UPDATE users SET password = ? WHERE email = ?";
        return this.executeSQL(sql, [newPassword, email]);
      }
      
}

module.exports = UserModel;