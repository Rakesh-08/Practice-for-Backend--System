
let mongoose = require("mongoose");

let appointmentsSchema = new mongoose.Schema({

    hospitalName: {
        type: String,
        required: true,
        ref:"hospitals"
    },
  department: {
        type: String,
        required: true,
        
    },
    appointmentDate: {
        type: Date,
        required: true,
        default:()=>Date.now()
    },
    timing: {
        type: Date,
        required:true
    },

    appointmentName: {
        type: String,
        required: true,
        ref:"users"
    }
    ,
    status: {
        type: String,
        required: true,
        default:"OPEN"
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }



})



let model = mongoose.model("appointments", appointmentsSchema)

module.exports = model;









