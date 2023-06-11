let studentModel = require("../models/userModel");

module.exports = async (req, res, next) => {
    
    if (!req.body.name) {
        return res.status(400).send({
           message:'name is not provided'
       })
    }
    
    if (!req.body.email) {
        return res.status(400).send({
            message:"please put your email id"
        })
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
        return res.status(400).send({
            message: "please put valid email "
        })
    }

    let isEmailAlreadyExist = await studentModel.findOne({
        email: req.body.email
    })

    if (isEmailAlreadyExist) {
        return res.status(200).send({
            message: "failed! you already have an account with this email"
        })
    }

    if (!req.body.Mobile) {
        return res.status(400).send({
            message:"please pass your contact number"
        })
    }

    next();

}