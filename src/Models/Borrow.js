class Borrow {
    constructor(bookId, userId, issueTime, returnTime) {
        this.bookId = bookId;
        this.userId = userId;
        this.issueTime = issueTime;
        this.returnTime = returnTime;
    }

    async save() {
        const res = await pool.query(
            'INSERT INTO borrow (book_id, user_id, issue_time, return_time) VALUES (?, ?, ?, ?)',
            [this.bookId, this.userId, this.issueTime, this.returnTime]
        );
        return res[0].insertId;
    }

    static async isAvailable(bookId) {
        const [rows] = await pool.query('SELECT * FROM borrow WHERE book_id = ? AND return_time IS NULL', bookId);
        if (rows.length > 0) return false;
        else return true;
    }

    static async getAvailableTime(bookId) {
        const [row] = await pool.query(
            'SELECT MIN(return_time) AS next_available_at FROM borrow WHERE book_id = ? AND return_time > NOW()',
            bookId
        );
        return row[0].next_available_at;
    }
}

module.exports = Borrow;