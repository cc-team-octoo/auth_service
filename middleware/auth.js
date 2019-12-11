require('dotenv').config()
const jwt = require('jsonwebtoken');


function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //check if token
    if(!token) return res.status(401).send('Access denied. No token provided');

    //validate token
    try {
        const decoded = jwt.verify(token, process.env.AUTH_KEY); 
        req.user = decoded;
        next();
    } 
    //if token not valid catch exception(ex)
    catch(ex) {
        res.status(400).send('Invalid token')
    }

};

module.exports = auth;