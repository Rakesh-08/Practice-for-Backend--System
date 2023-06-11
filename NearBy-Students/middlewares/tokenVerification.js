let jwt = require("jsonwebtoken");
let { secretKey }= require("../configs/authConfig")

module.exports = async (req, res, next) => {
    
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(400).send({
            message:"Failed ! request doesn't contain token"
        })
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({message:"Unauthorised ! invalid token"})
        }

        req._id= decoded.id
    })

    next();


}