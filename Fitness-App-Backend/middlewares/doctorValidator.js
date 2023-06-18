let doctorModel= require("../models/doctorModel")
let hospitalModel = require("../models/hospitalModel");


module.exports.doctorValidator = async (req, res, next) => {
    
    // for the firstName
    if (!req.body.firstName) {
        return res.status(400).send({
            message: "please provid your firstName"
        })
    }

    // for the lastName
    if (!req.body.lastName) {
        return res.status(400).send({
            message: "please provid your lastName"
        })
    }

    // for the email
    if (!req.body.email) {
        return res.status(400).send({
            message: "please provid your emailid"
        })
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
        return res.status(400).send({
            message: "please put valid email "
        })
    }


    let isEmailAlreadyExist = await doctorModel.findOne({
        email: req.body.email
    })

    if (isEmailAlreadyExist) {
        if (isEmailAlreadyExist.practicingAt.includes(req._id)) {
            return res.status(200).send({
                   message:"the doctor is already created with your hospital"
               })
        }
        else {

            isEmailAlreadyExist.practicingAt.push(req._id);
            await isEmailAlreadyExist.save();

            return res.status(200).send({
                message:"the doctor is created for your hospital"
            })
        }
    }

    // for the phone number
    if (!req.body.phone) {
        return res.status(400).send({
            message: "please provid your contact number"
        })
    }

    // for experience
    if (!req.body.experience) {
        return res.status(400).send({
            message:"please tell us your experience in this field"
        })
    }

    if (!req.body.department) {
        return res.status(400).send({
            message:"please pass the department name he works"
        })
    }

    next();
}

module.exports.IsHospital = async (req, res, next) => {
    
    let IsHospital = await hospitalModel.findOne({
        _id: req._id
    })

    if ( !IsHospital ) {
        return res.status(401).send({
            message: "unauthorised request ! this is permitted to the users signed as hospital"
        })
    }
    next()
}