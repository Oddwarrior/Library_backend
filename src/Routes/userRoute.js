const express = require('express');
const User = require('../Models/User');
const router = express.Router();

//get all users
router.get('/all', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }

});

//get user
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.find(id);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }

});

//create new user
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User(username, password);
        let createdUser = await user.save();
        res.status(200).json(createdUser);

    } catch (error) {
        res.status(500).json(error);
    }

});

module.exports = router;