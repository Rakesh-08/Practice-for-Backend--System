let hospitalModel = require("../models/hospitalModel")


module.exports = async (req, res, next) => {

    if (!req.body.hospitalName) {
        return res.status(400).send({
            message: "hospitalName is not provided"
        })
    }

    if (!req.body.hospitalEmail) {
        return res.status(400).send({
            message: "hospitalemail is not provided"
        })
    }


    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.hospitalEmail))) {
        return res.status(400).send({
            message: "please put valid email "
        })
    }


    let isEmailAlreadyExist = await hospitalModel.findOne({
        email: req.body.hospitalEmail
    })

    if (isEmailAlreadyExist) {
        return res.status(200).send({
            message: "failed! this email is already in use with other account"
        })
    }

    if (!req.body.hospitalPhone) {
        return res.status(400).send({
            message: "hospitals contact no. is not provided"
        })
    }

    if (!req.body.hospitalAddress) {
        return res.status(400).send({
            message: " hospitals address  is required"
        })
    }

    if (!req.body.userId) {
        return res.status(400).send({
            message: "userId is not provided"
        })
    }
    if (!req.body.userId) {
        return res.status(400).send({
            message: "please pass the userId"
        })
    }

    let isHospitalAlreadyExist = await hospitalModel.findOne({
        userId: req.body.userId
    })

    if (isHospitalAlreadyExist) {
        return res.status(400).send({
            message: "Failed! hospital already have an account with this userId"
        })
    }

    if (!req.body.password) {
        return res.status(400).send({
            message: "password is not provided"
        })
    }

    next()

}