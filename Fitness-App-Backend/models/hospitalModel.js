
let mongoose = require("mongoose");

let hospitalSchema = new mongoose.Schema({

    hospitalName: {
        type: String,
        required: true,
        unique:true
    }
   
    , hospitalEmail: {
        type: String,
        required: true
    },
   hospitalPhone: {
        type: Number,
        required: true
    },
    hospitalAddress: {
        type: String,
        required:true
   },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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



let model = mongoose.model("hospitals", hospitalSchema)

module.exports = model;









