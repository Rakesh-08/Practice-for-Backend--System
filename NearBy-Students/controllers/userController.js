let jwt = require("jsonwebtoken");
let studentModel = require("../models/userModel");
let { secretKey } = require("../configs/authConfig")


let createStudent = async (req, res) => {
    try {
        let objectPassed = req.body;

        let student = await studentModel.create(objectPassed);

        let accessToken = jwt.sign({ id: student._id }, secretKey, { expiresIn: 84599 })
        
        if (student) {

            res.status(200).send({...objectPassed,createdAt:student.createdAt,updatedAt:student.updatedAt, _id:student._id,accessToken})
        }
    } catch (err) {
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }
}

let updateStudent = async (req, res) => {
    try {
        
        if (req._id !== req.params.studentId) {
            
            return res.status(401).send({
                message:"Unauthorised request"
            })
        }

        let update = req.body;
        if (Object.keys(update).includes("location")) {
            return res.status(400).send({
                message:"failed ! you cannot update the location  from here"
            })
        }
   
        let updatedResponse = await studentModel.findOneAndUpdate({
            _id:req._id
        }, update, {
            new:true
        })

        if (updatedResponse) {
            res.status(200).send(updatedResponse )
        } else {
            res.status(400).send({
                message:"can't update the undefined student"
            })
        }


    } catch (err) {
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }
}

let getAllStudents = async (req, res) => {
    try {

        let allStudents = await studentModel.find({})
        if (allStudents) {
            res.status(200).send(allStudents)
        }

    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let getStudentById = async (req, res) => {
    try {

        let student = await studentModel.findOne({
        _id:req.params.studentId
        })

        if (!student) {
            return res.status(400).send({
               message:"bad request, no student exist with given id"
           })
        }

        res.status(200).send(student)

    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let deleteStudent = async (req, res) => {
    try {
        if (req._id !== req.params.studentId) {

            return res.status(401).send({
                message: "Unauthorised request"
            })
        }

        let removed = await studentModel.deleteOne({
            _id:req.params.studentId
        })

        if (removed.deletedCount!== 0) {
            res.status(200).send({...removed,studentId:req._id})
        } else {
            res.status(400).send({
                message:"student you want to delete doesn't exist"
            })
        }

    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}


module.exports = {
    createStudent,
    updateStudent,
    getAllStudents,
    getStudentById,
    deleteStudent
}