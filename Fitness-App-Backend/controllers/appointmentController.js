let userModel = require("../models/userModel");
let hospitalModel = require("../models/hospitalModel");
let appointmentModel = require("../models/appointmentModel");
let symptomsModel= require("../models/symptomsModel")

let bookAppointment = async (req, res) => {
    try {
 
        let requester= await hospitalModel.findOne({_id:req._id})
 
        if (requester) {
            return res.status(401).send({
                message:"unauthorised request by hospital "
            })
        }

        let ObjectPassed = {};
        let {hospitalName,department,symptomsType,duration,symptomsInfo,appointmentDate ,shift }= req.body
         
        // create symptoms

        let symptoms = await symptomsModel.create({
            symptomsType: symptomsType,
            duration: duration,
            symptomsInfo: symptomsInfo

        })

        ObjectPassed.hospitalName = hospitalName;
        ObjectPassed.department = department;;
        ObjectPassed.appointment = req._id;
        ObjectPassed.symptoms= symptoms._id;
        ObjectPassed.appointmentDate = appointmentDate;
        ObjectPassed.shift = shift;
        
        
        let createAppointment = await appointmentModel.create(ObjectPassed)
        
        if (createAppointment) {
            res.status(200).send({
                _id:createAppointment._id,
                ...ObjectPassed,
                status: createAppointment.status,
                appointmentDate: createAppointment.appointmentDate
                
            })
        }

     } catch (err) {
        console.log(err)
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }
}


let updateAppointment = async (req, res) => {
    
    try {

        let updatePassed=req.body;
           
        let booking = await appointmentModel.findOne({
            _id: req.params.appointmentId
        })
        let hospital = await hospitalModel.findOne({
            hospitalName:booking.hospitalName
        })

        if (!(req._id == booking.appointment || req._id == hospital._id)) {
            return res.status(401).send({
                message:"unauthorised request"
            })
        }

      let updatedAppointment= await appointmentModel.findOneAndUpdate({
          _id:req.params.appointmentId},updatePassed,{
          new:true});
        
        res.status(200).send(updatedAppointment)

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let deleteAppointment = async (req, res) => {
    
    try {
           
        let booking = await appointmentModel.findOne({ _id: req.params.appointmentId });
 
        if (!booking) {
            return res.status(400).send({
                message:"invalid appointment id , no appointment exist"
            })
        }
        
 
        if ( booking.appointment.toString() !== req._id) {
            return res.status(401).send({
                message:"Unauthorised request by the user"
            })
        }

        let removed = await appointmentModel.deleteOne({ _id: req.params.appointmentId })
        
        if (removed.deletedCount>0) {
        
            res.status(200).send({
                ...removed, message: `appointment with id ${req.params.appointmentId} has been removed`
            })
        } else {
            res.status(400).send({
                message:"no appointment to be removed"
            })
        }


    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let getAllAppointments = async (req, res) => {
    
    try {
        let hospital = await hospitalModel.findOne({
            _id:req._id
        })
        let allAppointments;

        if (hospital) {
            allAppointments = await appointmentModel.find({
                hospitalName:hospital.hospitalName
            })
        } else {
            allAppointments = await appointmentModel.find({
                appointment:req._id
            })
        }

        if (allAppointments && allAppointments.length > 0) {
            res.status(200).send(allAppointments)
        } else {
            res.status(400).send({
                message:"no appointments to show"
            })
        }
        

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let getAppointmentById = async (req, res) => {
    
    try {

        let booking = await appointmentModel.findOne({
            _id: req.params.appointmentId
        })
        let hospital = await hospitalModel.findOne({
            hospitalName: booking.hospitalName
        })

        if (!(hospital || booking)) {
            return res.status(400).send({
                message:"please provide valid appointment id"
            })
        }

        if (!(req._id == booking.appointment || req._id == hospital._id)) {
            return res.status(401).send({
                message: "unauthorised request"
            })
        }

        if (booking) {
            res.status(200).send(booking)
        } else {
            res.status(400).send({
                message:"you don't have any appointment with this id"
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
    bookAppointment,
    updateAppointment,
    deleteAppointment,
    getAllAppointments,
    getAppointmentById
}


