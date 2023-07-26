let prescriptionModel = require("../models/prescriptionModel");
let recordsModel = require("../models/trackRecords");
let appointmentModel = require("../models/appointmentModel");
let doctorModel = require("../models/doctorModel");
let hospitalModel= require("../models/hospitalModel")

let createRecord = async (req, res) => {
    try {

        let { statusReport, appointmentId,doctorId, prescription, dosage } = req.body

        let hospital = await hospitalModel.findOne({
            _id:req._id
        })

        let booking = await appointmentModel.findOne({
            _id: appointmentId,
            status: "OPEN",
            hospitalName:hospital.hospitalName
        })

        if (!booking) {
            return res.status(400).send({
                message: "there is no open appointment for this appointmentId"
            })
        }
          
  
        let record = await recordsModel.findOne({
            patient: booking.appointment.toString()
        })

        let medicalAdvice = await prescriptionModel.create({
            prescription: prescription,
            dosage: dosage,
            prescribedDoctor: doctorId
        })

        // if there is another appointment for the same patient then ....
        
        if (record && record.hospital.toString() == req._id) {

            record.doctorAttended.push(doctorId);
            record.symptoms.push(booking.symptoms);
            record.prescription.push(medicalAdvice._id);
            record.statusReport = statusReport;

            await record.save();
            return res.status(200).send(record)
        }

        let createObject = {
            patient: booking.appointment.toString(),
            hospital: req._id,
            doctorAttended: [doctorId],
            symptoms: [booking.symptoms],
            prescription: [medicalAdvice._id],
            statusReport: statusReport

        }

        let createRecord = await recordsModel.create(createObject)

        if (createRecord) {
            console.log(booking.status)
            
            booking.status = 'VISITED';
            await booking.save();
 
            console.log(booking.status)

            res.status(200).send({
                _id:createRecord._id,
                ...createObject,
                createdAt: createRecord.createdAt,
                 updatedAt:createRecord.updatedAt
            })
        }


    } catch (err) {
        console.log(err)
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }
}

let updateRecord = async (req, res) => {
    try {

        let record = await recordsModel.findOne({
            _id:req.params.recordId
        })

        if (!record) {
            return res.status(400).send({
                message:"no record exist with this id"
            })
        }

        if (record.hospital.toString() !== req._id) {
            return res.status(401).send({
                message:"Unauthorised request by different hospital"
            })
        }

        let update = req.body;

        let updatedResponse = await recordsModel.findOneAndUpdate({
            _id:req.params.recordId
        }, update, { new: true })
        
        if (updatedResponse) {
            res.status(200).send(updatedResponse)
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let deleteRecord = async (req, res) => {
    try {
        let record = await recordsModel.findOne({
            _id: req.params.recordId
        })

        if (!record) {
            return res.status(400).send({
                message: "no record exist with this id"
            })
        }

        if (record.hospital.toString() !== req._id) {
            return res.status(401).send({
                message: "Unauthorised request by different hospital"
            })
        }

      let removed=  await recordsModel.deleteOne({
            _id:req.params.recordId
        })

        if (removed.deletedCount > 0) {
            res.status(200).send({
                message: `record with id ${req.params.recordId} has been removed`
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let getRecordById = async (req, res) => {
    try {
        let record = await recordsModel.findOne({
            _id:req.params.recordId
        })
        
        if (!record) {
            return res.status(400).send({
                message:"no record exist for this id"
            })
        }


        if (!(record.patient == req._id || record.hospital == req._id)) {
            return res.status(401).send({
                message:"Unauthorised request "
            })
        }

        if (record) {
            res.status(200).send(record)
        } else {
            res.status(400).send({
                message:"invalid id ! no record exist with this id"
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let getAllRecords = async (req, res) => {
    try {

        let hospital = await hospitalModel.findOne({
            _id:req._id
        })

        let allRecords;

        if (hospital) {
             
            allRecords = await recordsModel.find({
                hospital:req._id
            })
        } else {
            allRecords = await recordsModel.find({
                patient:req._id
            })
        }

        if (allRecords && allRecords.length > 0) {
            res.status(200).send(allRecords)
        } else {
            res.status(400).send({
                message:"no records to show"
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
    createRecord,
    updateRecord, deleteRecord,
    getAllRecords,
    getRecordById
}






