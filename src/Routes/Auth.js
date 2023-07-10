const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        let { username, password, email, admin } = req.body;
        admin != undefined ? admin = true : false;

        password = await bcrypt.hash(password, 10);
        const user = new User(username, password, email, admin);


        let user_id = await user.save();

        res.status(200).send({
            "status": "Account successfully created",
            "status_code": 200,
            user_id
        });

    } catch (error) {
        console.log(error);
        if (error.errorno === 1062) {
            res.status(404).send("User already exists")
        }
        else res.status(500).json(error);
    }

}

const login = async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = await User.findByUsername(username);

        if (!user) {
            return res.status(200).send({
                "status": "User does not exists",
                "status_code": 401
            });
        }
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).send({
                "status": "Incorrect username/password provided. Please retry",
                "status_code": 401
            })
        }
        let user_id = user.id;
        const accessToken = jwt.sign({ user_id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            status: 'Login successful',
            status_code: 200,
            user_id: user_id,
            access_token: accessToken
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const verify = (req, res, next) => {
    const AuthHeader = req.headers.authorization;

    if (!AuthHeader) {
        return res.status(401).json({ status: 'No token provided' });
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ status: 'token not valid!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, userdata) => {
        if (err) {
            return res.status(401).json({ error: 'Access denied !' });
        }

        req.user_id = userdata.user_id;
        next();
    });
};


module.exports = { signup, login, verify }