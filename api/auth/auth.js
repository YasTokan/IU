const jwt = require("jsonwebtoken");
const config = require("../../config.json");


const verifyToken = (req, res, next) => {
    console.log("verifyToken")
    if (!req.headers.authentication) {
        return res.status(403).send("A token is required for authentication");

    }
    const token =
        req.headers.authentication.split(" ")[1];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
        return next();

    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};
module.exports = verifyToken;
