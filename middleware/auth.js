const jwt = require("jsonwebtoken")
const config = require("config")

// function auth(req, res, next) {
//     console.log('headerHEADER '+req.header)
//     const token = req.header("x-auth-token")
//     console.log(token)
//     if (!token) return res.status(401).send("Access denied. No token provided.");
//     try {
//         const result = jwt.verify(token, config.get("jwtPrivateKey"))
//         req.user = result;
//         req.user.id
//         next();
//     } catch (err) {
//         res.status(400).send("Invalid token.")
//     }
// }

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
            firstname: decrypt.firstname,
        };
        console.log('hallelujah')
        next();
        } catch (err) {
            return res.status(500).json(err.toString());
        }
    };


module.exports = auth;