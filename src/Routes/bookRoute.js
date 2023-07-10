const express = require('express');
const router = express.Router();
const Book = require('../Models/Book');

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

module.exports = router;
