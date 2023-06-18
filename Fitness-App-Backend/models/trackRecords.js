
let mongoose = require("mongoose");

let trackRecordSchema = new mongoose.Schema({
   
    patient: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref:"users"
    },
    hospital: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "hospitals"
    },
    doctorAttended: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        ref:"doctors"
    },
    prescription:{
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        ref:"prescriptions"
        
    },
    symptoms: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        ref:"symptoms"
    },
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









