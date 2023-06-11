let mongoose = require("mongoose");
let pointSchema= require("./pointSchema")

let userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    Mobile: {
        type: Number,
        required:true
    },

    location: {
        type: pointSchema ,
        index: "2dsphere"
    },

    createdAt: {
        type: Date,
        immutable: true,
        default:()=>Date.now()
    },
    
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }



})

let model = mongoose.model("students", userSchema);
module.exports = model;