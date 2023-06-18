
let mongoose = require("mongoose");

let symptomsSchema = new mongoose.Schema({

    symptomsType: {
        type: String,
        required:true
    },
    duration: {
        type: String,
        required:true
    },
    symptomsInfo: {
        type: String,
        required:true
    },



})



let model = mongoose.model("symptoms", symptomsSchema)

module.exports = model;









