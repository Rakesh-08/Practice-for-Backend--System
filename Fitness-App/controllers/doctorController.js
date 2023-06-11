let doctorModel = require("../models/doctorModel");


let createDoctor = async (req, res) => {

    try {

        let ObjectPassed = req.body;

        ObjectPassed.practicingAt= [req._id]

        let doctor = await doctorModel.create(ObjectPassed)

        if (doctor) {
            res.status(200).send({
                ...ObjectPassed,
                _id: doctor._id,
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
        let doctor = await doctorModel.findOne({
              _id:req.params.doctorId
        })
        
        if (!doctor.practicingAt.includes(req._id)) {
            return res.status(401).send({
                message:"unauthorised request by different hospital"
            })
        }

        let update = req.body;
        if (Object.keys(update).includes("practicingAt")) {
            return res.status(401).send({
                messsage:"you can't update this field , its immutable"
            })
        }

        let updatedResponse = await doctorModel.findOneAndUpdate({
            _id:req.params.doctorId
        }, update, {
            new :true
        })
          
        if (updatedResponse) {
            res.status(200).send(updatedResponse)
        }


    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}


let getAllDoctors = async (req, res) => {
    try {
        let allDoctors = await doctorModel.find({
               practicingAt:req._id
        })
        
        if (allDoctors.length > 0) {
            res.status(200).send(allDoctors)
        } else { 
            res.status(200).send({
                message:"no doctors to show "
            })
        }
    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let getDoctorById = async (req, res) => {
    try {
        let doctor = await doctorModel.findOne({
            _id:req._id
        })
        if (!doctor) {
            return res.status(400).send({
                message:"No doctor exist with given id"
            })
        }

        res.status(200).send(doctor)
    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let deleteDoctor = async (req, res) => {
    try {
        let doctor = await doctorModel.findOne({
            _id: req.params.doctorId
        })

        if (!doctor.practicingAt.includes(req._id)) {
            return res.status(401).send({
                message: "unauthorised request by different hospital"
            })
        }

       doctor= doctor.practicingAt.filter(hospId=>hospId!==req._id)
        await doctor.save();

        if (doctor.length > 0) {
            res.status(200).send({
                message:`doctor with id ${req.params.doctorId} has been removed from your hospital`
            })
        } else {
            res.status(400).send({
                message:"there is no doctor to be removed"
            })
        }

    } catch (err) {
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }
}


module.exports = {
    createDoctor,
    updateDoctor,
    getAllDoctors,
    getDoctorById,
    deleteDoctor
}


