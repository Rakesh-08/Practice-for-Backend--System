let authConfig = require("../configs/authConfig");
let jwt = require("jsonwebtoken")
let tokenVerification = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(400).send({
            message: "please pass the token in the headers"
        })
    }

    jwt.verify(token, authConfig.secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthenticated ! invalid token"
            })
        }

        req._id = decoded.id
    })

    next();
}

module.exports = {
    tokenVerification
}