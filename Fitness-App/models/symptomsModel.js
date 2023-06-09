
let mongoose = require("mongoose");

let symptomsSchema = new mongoose.Schema({

    symptomsType: {
        type: String,
        required:true
    },
    duration: {
        type: Number,
        required:true
    },
    symptomsInfo: {
        type: String,
        required:info
    },



})



let model = mongoose.model("symptoms", symptomsSchema)

module.exports = model;









