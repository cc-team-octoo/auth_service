const jwt = require("jsonwebtoken")
const config = require("config")

async function auth(req, res, next) {
    const token = req.cookies.token || '';
    console.log(`nasztoken: ${token}`)
    try {
        if (!token) {
            return res.status(401).json('You need to Login')
        }
        const decrypt = await jwt.verify(token, config.get("jwtPrivateKey"));
        req.user = {
            id: decrypt.id,
            name: decrypt.name,
        };
        next();
        } catch (err) {
            return res.status(500).json(err.toString());
        }
    };

module.exports = auth;
