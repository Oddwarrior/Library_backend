const pool = require('../config/db')
class User {

    constructor(username, password, email, admin) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.admin = admin;
    }

    async save() {
        const res = await pool.query("INSERT INTO user (username , password, email, admin) VALUES (?, ? , ?, ?)",
            [this.username, this.password, this.email, this.admin]);
        return res[0].insertId;
    }

    static async findAll() {
        const [rows] = await pool.query("SELECT * FROM user");
        return rows;
    }

    static async find(id) {
        const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", id);
        return rows[0];
    }
    static async findByUsername(username) {
        const [rows] = await pool.query("SELECT * FROM user WHERE username = ?", username);
        return rows[0];
    }

}

module.exports = User;