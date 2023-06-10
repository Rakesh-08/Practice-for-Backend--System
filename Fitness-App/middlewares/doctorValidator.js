let doctorModel = require('../models/doctorModel');

module.exports = async (req, res, next) => {
    
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

        if (isEmailAlreadyExist.practicingAt.includes(req.userId)) {
            return res.status(200).send({
                message:"this doctor is already added with your hospital"
            })
        } else {
            isEmailAlreadyExist.practicingAt.push(req.userId)
            await isEmailAlreadyExist.save();
            
            return res.status(200).send({
                message:"the doctor is added with your hospital"
            })
        }
       
    }

    // for the phone number
    if (!req.body.phone) {
        return res.status(400).send({
            message: "please provid your contact number"
        })
    }

    // for the work
    if (!req.body.practicingAt) {
        return res.status(400).send({
            message:"please pass the hospital name you are working at"
        })
    }

    // for the experience
    if (!req.body.experience) {
        return res.status(400).send({
            message:"Failed ! please mention your experience"
        })
    }


    next();


}