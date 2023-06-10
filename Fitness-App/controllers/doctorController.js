
let doctorModel= require("../models/doctorModel")

let addDoctor = async (req, res) => {

    try {

        let doctor = await doctorModel.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            experience: req.body.experience,
            practicingAt:[req.userId]
        })


        if (doctor) {
            res.status(200).send({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                experience: req.body.experience,
                practicingAt: [req.userId],
                createdAt: doctor.createdAt,
                updatedAt:doctor.updatedAt
            })
        }

     } catch (err) {
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }
    
}

let updateDoctor = async (req, res) => {

    try {


    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}


let getAllDoctors  = async (req, res) => {

    try {


    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}


let getDoctorById = async (req, res) => {

    try {


    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}

let removeDoctor = async (req, res) => {
 
    try {


    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}

module.exports = {
    addDoctor,
    updateDoctor,
    getAllDoctors,
    getDoctorById,
    removeDoctor
}


