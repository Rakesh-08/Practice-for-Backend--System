let userModel = require("../models/userModel");
let trackRecordsModel= require('../models/trackRecords')
let passwordLessUser= require("../utils/secureResponse")

let updateUser = async (req, res) => {
    try {
        let id = req.params.userId;
        if (req._id !== id) {
            return res.status(401).send({
                message:"unauthorised request by someone "
            })
        }
        let update = req.body;
       

        let updatedResponse = await userModel.findOneAndUpdate({
            _id:id
        }, update, { new: true })
        
        if (updatedResponse) {
            res.status(200).send(passwordLessUser([updatedResponse]))
        }

        
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }
}


let deleteUser = async (req, res) => {
    try {
        let id = req.params.userId;
        if (req._id !== id) {
            return res.status(401).send({
                message: "unauthorised request by someone "
            })
        }
        let IsUserExist= await userModel.findOne({_id:id})

        if (!IsUserExist) {
            return res.status(400).send({
                message:"no user exist with given id"
            })
        }

        let remove = await userModel.deleteOne({ _id: id })
        
        res.status(200).send({
               message:`user with id ${id} has been removed from the app`
           })


    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let getAllUsers = async (req, res) => {
    try {
        let patients = await trackRecordsModel.find({
            hospital: req._id
        }).select({ "patient": 1, "_id": 0 });

        let users = await userModel.find({
            _id: {
                $in:patients
            }
        })

        if (users.length > 0) {
            res.status(200).send(passwordLessUser(users))
        } else {
            res.status(200).send({
                message:"no users to show for your hospital"
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let getUserById = async (req, res) => {
    try {

        let IsUserWithHospital = await trackRecordsModel.findOne({
            patient: req.params.userId,
            hospital:req._id
        })
        
        if (!(req._id== req.params.userId || IsUserWithHospital)) {
            return res.status(401).send({
                message:"Unauthorised request by the user"
            })
        }

        let user = await userModel.findOne({
            _id:req.params.userId
        })


        if (user) {
            res.status(200).send(passwordLessUser([user]))
        } else {
            res.status(400).send({
                message:"user with given id doesn't exist "
            })
        }


    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById
}
