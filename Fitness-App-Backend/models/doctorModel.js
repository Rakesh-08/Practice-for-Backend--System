
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
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        ref:"hospitals"
    },
    experience: {
        type: String,
        required:true,
    },
    department: {
        type: String,
        required:true
    }


})



let model = mongoose.model("doctors", doctorSchema)

module.exports = model;









