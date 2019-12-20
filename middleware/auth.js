const jwt = require("jsonwebtoken")
const config = require("config")

async function auth(req, res, next) {
    const token = req.cookies.token || '';
    try {
        if (!token) {
            return res.status(401).json('You need to Login')
        }
        const decrypt = await jwt.verify(token, config.get("jwtPrivateKey"));
        req.user = {
            id: decrypt._id,
            name: decrypt.name,
        };
        console.log(`auth id: ${req.user.id}`)
        next();
        } catch (err) {
            return res.status(500).json(err.toString());
        }
    };

module.exports = auth;
