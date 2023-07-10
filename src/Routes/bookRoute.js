const express = require('express');
const router = express.Router();
const Book = require('../Models/Book');
const Borrow = require('../Models/Borrow');

router.post('/create', async (req, res) => {
    const { title, author, isbn } = req.body;

    try {
        const book = new Book(title, author, isbn);
        const book_id = await book.save();
        console.log(book_id);

        res.status(201).json({

            "message": "Book added successfully",
            "book_id": book_id

        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            "message": "error coccured"
        });
    }
});


router.get('/', async (req, res) => {
    const { title } = req.query;

    try {
        const books = await Book.findByTitle(title);

        if (!books) {
            return res.status(401).send("message : book does not exist");
        }
        res.status(200).json({
            books: books
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }

});

router.post('/borrow', async (req, res) => {
    const { book_id, user_id, issue_time, return_time } = req.body;

    try {
        const available = await Book.isAvailable(book_id);

        if (available) {
            const borrow = new Borrow(book_id, user_id, issue_time, return_time);
            const booking_id = await borrow.save();

            res.status(200).json({
                status: 'Book borrowed successfully',
                status_code: 200,
                booking_id: booking_id
            });

        } else {
            res.status(400).json({
                status: 'Book is not available at this moment',
                status_code: 400
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }

});

module.exports = router;
