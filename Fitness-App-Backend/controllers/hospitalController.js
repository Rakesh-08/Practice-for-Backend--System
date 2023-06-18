
let hospitalModel = require("../models/hospitalModel")
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let passwordLessUser = require("../utils/secureResponse");
const authConfig = require("../configs/authConfig");


let signUpAsHospital = async (req, res) => {

    try {

        let hospital = await hospitalModel.create({
            hospitalName: req.body.hospitalName,
            hospitalEmail: req.body.hospitalEmail,
            hospitalAddress: req.body.hospitalAddress,
            hospitalPhone: req.body.hospitalPhone,
            userId: req.body.userId,
            password: bcrypt.hashSync(req.body.password, 8)
        })

        if (hospital) {
            res.status(200).send(passwordLessUser([hospital]))
        }

    } catch (err) {


        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}


let updateHospital = async (req, res) => {

    try {

        let hospital = await hospitalModel.findOne({
            _id: req.params.hospitalId
        })

        if (!hospital) {
            return res.status(400).send({
                message: "No hospital exist with given id"
            })
        }

        if (req.params.hospitalId !== req._id) {
            return res.status(401).send({
                message: "Unauthorised ! you are not allowed to access this route"
            })
        }

        let update = req.body;

        let updatedHospital = await hospitalModel.findOneAndUpdate({
            _id: req.params.hospitalId
        }, update, {
            new: true
        })

        if (updateHospital) {
            res.status(200).send(passwordLessUser([updatedHospital]))
        }
    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let getAllHospitals = async (req, res) => {

    try {
        let hospitals = await hospitalModel.find({})

        if (hospitals.length>0) {
            res.status(200).send(passwordLessUser(hospitals))
        } else {
            res.status(200).send({
                message: "there are no hospitals to show"
            })
        }

    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}

let getHospitalById = async (req, res) => {
    try {

        let hospital = await hospitalModel.findOne({
            _id: req.params.hospitalId
        })

        if (!hospital) {
            return res.status(400).send({
                message: "No hospital exist with given id"
            })
        }

        res.status(200).send(passwordLessUser([hospital]))

    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let deleteHospital = async (req, res) => {
    try {
        let hospital = await hospitalModel.findOneAndDelete({
            _id: req.params.hospitalId
        })

        if (!hospital) {
            return res.status(400).send({
                message: "No hospital exist with given id"
            })
        }

        if (hospital._id !== req._id) {
            return res.status(401).send({
                message: "Unauthorised ! you are not allowed to access this route"
            })
        }

        res.status(200).send({
            message: `hospital with id ${hospital._id} has been removed`
        })

    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}

module.exports = {
    signUpAsHospital,
    updateHospital,
    getAllHospitals,
    getHospitalById,
    deleteHospital

}