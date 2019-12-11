require('dotenv').config()
const jwt = require('jsonwebtoken');


function adminAuth(req, res, next) {
    const token = req.header('x-auth-token');

    //check if token
    if(!token) return res.status(401).send('Access denied. No token provided');

    //validate token
    try {
        const decoded = jwt.verify(token, process.env.AUTH_KEY); 
        req.user = decoded;
        //check if admin
        if (!decoded.admin) return res.status(403).send('Access denied');
        //continue if admin
        next();
    } 
    //if token not valid catch exception(ex)
    catch(ex) {
        res.status(400).send('Invalid token')
    }

};

module.exports = adminAuth;