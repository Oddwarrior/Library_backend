const express = require('express');
const cors = require('cors');
const { signup, login } = require('./src/Routes/Auth')

const app = express();

app.use(cors());
app.use(express.json());

//routes 
app.post('/api/signup', signup);
app.post('/api/login', login);
app.use('/', (req, res) => {
    res.send("Welcome to library!");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})