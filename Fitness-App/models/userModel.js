
let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({

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
        required: true,
        unique:true
    },
    phone: {
        type: Number,
        required: true
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



let model = mongoose.model("users", userSchema)

module.exports = model;









