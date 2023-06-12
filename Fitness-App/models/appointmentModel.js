
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
    }



})



let model = mongoose.model("appointments", appointmentsSchema)

module.exports = model;









