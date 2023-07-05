
let mongoose = require("mongoose");

let appointmentsSchema = new mongoose.Schema({

    hospitalName: {
        type: String,
        required: true,
        ref: "hospitals"
    },
    department: {
        type: String,
        required: true,

    },
    symptoms: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"symptoms"
    },

    appointment: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users"
    }
    ,
    status: {
        type: String,
        default: "OPEN"
    },
     appointmentDate: {
        type: Date,
        default: () => Date.now()
    },
    shift: {
        type: "String" 
        required:true
     },
    updatedAt: {
        type: Date,
        default:()=>Date.now()
     }



})



let model = mongoose.model("appointments", appointmentsSchema)

module.exports = model;









