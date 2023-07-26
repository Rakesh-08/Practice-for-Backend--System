
let mongoose = require("mongoose");

let trackRecordSchema = new mongoose.Schema({
   
    patient: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
       unique:true,
        ref:"users"
    },
    patientName: String,

    hospital: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "hospitals"
    },
    hospitalName: "String",
    
    doctorAttended: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        ref:"doctors"
    },

    doctorsName:[String],
    
    prescription:{
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        ref:"prescriptions"
        
    },
    prescriptionList:[mongoose.SchemaTypes.Object],

    symptoms: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        ref:"symptoms"
    },

    symptomsList: [mongoose.SchemaTypes.Object],
    statusReport: {
        type: String,
        required:true
    },

    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()

    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }



})



let model = mongoose.model("trackRecords", trackRecordSchema)

module.exports = model;









