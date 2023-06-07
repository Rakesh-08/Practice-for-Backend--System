let jwt = require("jsonwebtoken");
let authConfig = require("../configs/authConfig");
let UserModel = require("../models/UserModel");
let constants= require("../utils/constants")


let verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message:"Failed! please provide token"
        })
    }
 
    jwt.verify(token, authConfig.secretKey, (err, decoded) => {
        if (err) {
           return res.status(403).send({
                message:"unauthenticated request! please provide valid token"
            })
        } 
     
            req._id=decoded.id
        
    })

    next();

    
}

let isCompany = async (req, res, next) => {

    let company = await UserModel.findOne({
        _id: req._id,
        role:constants.roles.company
    })

    if (!company) {
        return res.status(401).send({
            message:"unauthorised ! only companies are allowed to do this"
        })
    }

    next();
    
}


let isAdmin = async (req, res, next) => {

    let admin = await UserModel.findOne({
        _id: req._id,
        role: constants.roles.admin
    })
 

    if (!admin) {
        return res.status(401).send({
            message: "unauthorised ! only admins can access this route"
        })
    }

    next();

}

module.exports = {
    verifyToken,
    isCompany,
    isAdmin
}

