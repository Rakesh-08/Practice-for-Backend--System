
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
        type: Number,
        required:true,
    }


})



let model = mongoose.model("doctors", doctorSchema)

module.exports = model;









