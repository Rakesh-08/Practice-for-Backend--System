
let mongoose = require("mongoose");

let doctorSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    }
    , lastName: {
        type: String,
        required: true
    }
    , email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    practicingAt: {
        type: [String],
        required: true,
        ref:"hospitals"
    },
    experience: {
        type: Number,
        required:true,
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



let model = mongoose.model("doctors", doctorSchema)

module.exports = model;









