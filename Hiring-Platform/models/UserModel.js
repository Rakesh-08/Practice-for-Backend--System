
const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: String,
         default:"STUDENT"
    },

    createdAt: {
        type: Date,
        immutable:true,
        default:()=>Date.now()
    },
    updatedAt: {
        type: Date,
        default:()=>Date.now()
    }


})

let model= mongoose.model("UserModel",userSchema)

module.exports = model;










