let prescriptionModel = require("../models/prescriptionModel");
let recordsModel = require("../models/trackRecords");
let appointmentModel = require("../models/appointmentModel");
let doctorModel = require("../models/doctorModel");
let hospitalModel= require("../models/hospitalModel")

let createRecord = async (req, res) => {
    try {

        let { statusReport, appointmentId, prescription, dosage } = req.body

        let booking = await appointmentModel.findOne({
            _id: appointmentId,
            status: "OPEN"
        })

        if (!booking) {
            return res.status(400).send({
                message: "there is no open appointment for this appointmentId"
            })
        }
        
        booking.status = 'FULFILLED';
        await booking.save();
  
        let record = await recordsModel.findOne({
            patient: booking.appointment
        })
      
        
        let doctor = await doctorModel.findOne({
            department: booking.department
        })

        if (!doctor) {
            doctor = { _id: "To Be Assigned" }
        }

        let medicalAdvice = await prescriptionModel.create({
            prescription: prescription,
            dosage: dosage,
            prescribedDoctor: doctor._id
        })

        // if there is another appointment for the same patient then ....
        
        if (record && record.hospital == req._id) {

            record.doctorAttended.push(doctor._id);
            record.symptoms.push(booking.symptoms);
            record.prescription.push(medicalAdvice._id);
            record.statusReport = statusReport;

            await record.save();
            return res.status(200).send(record)
        }

        let createObject = {
            patient: booking.appointment,
            hospital: req._id,
            doctorAttended: [doctor._id],
            symptoms: [booking.symptoms],
            prescription: [medicalAdvice._id],
            statusReport: statusReport

        }

        let createRecord = await recordsModel.create(createObject)

        if (createRecord) {
            res.status(200).send({
                _id:record._id,
                ...createObject,
                createdAt: record.createdAt,
                 updatedAt:record.updatedAt
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

        if (record.hospital !== req._id) {
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

        if (record.hospital !== req._id) {
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






