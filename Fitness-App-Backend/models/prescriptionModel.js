
let mongoose = require("mongoose");

let prescriptionSchema = new mongoose.Schema({

    
    prescription: {
        type: String,
        required:true
    },
    dosage: {
        type: String,
        required:true
    },
    prescribedDoctor: {
        type: String,
        ref:"doctors"
    },
    createdAt: {
        type: Date,
        immutable: true,
        default:()=>Date.now()
    }



})



let model = mongoose.model("prescriptions",prescriptionSchema)

module.exports = model;









