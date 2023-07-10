const pool = require('../config/db');

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    async save() {
        const res = await pool.query('INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)',
            [this.title, this.author, this.isbn]);;
        return res[0].insertId;
    }

    static async findByTitle(title) {
        const [rows] = await pool.query('SELECT * FROM books WHERE title = ?', title);
        return rows;
    }
}

module.exports = Book;
