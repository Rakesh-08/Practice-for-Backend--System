 
let UserModel = require("../models/UserModel");
let constants = require("../utils/constants");


const validateSignup =async (req, res, next) => {
    
    // firstName 
    if (!req.body.firstName) {
        return res.status(400).send({
            message:"please provide firstName"
        })
    }
    
    // lastName
    if (!req.body.lastName) {
        return res.status(400).send({
            message: "please provide lastName"
        })
    }

    // email
    if (!req.body.email) {
        return res.status(400).send({
            message: "please pass the email, it can't be empty"
        })
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
        return res.status(400).send({
            message:"please put valid email "
        })
    }
    
    let isEmailAlreadyExist = await UserModel.findOne({
        email:req.body.email
    })

    if (isEmailAlreadyExist) {
       return res.status(200).send({
            message:"failed! you already have an account with this email"
        })
    }


    // password
     if (!req.body.password) {
        return res.status(400).send({
            message: "password is not provided"
        })
    }
  
    // roles
    if (!req.body.role) {
        return res.status(400).send({
            message: "please provide the role "
        })
    }

    let rolesExist = Object.values(constants.roles);

    if (!rolesExist.includes(req.body.role)) {
        return res.status(400).send({
            message:"please pass valid role"
        })
    }

    next();

}

const validateSignin = (req, res, next) => {

    if (!req.body.email) {
        return res.status(400).send({
            message:"required! please pass the email "
        })
    }

    if (!req.body.password) {
        return res.status(400).send({
            message:"required ! please pass the password"
        })
    }
    
    next();
}

module.exports = {
    validateSignin,
    validateSignup
}

