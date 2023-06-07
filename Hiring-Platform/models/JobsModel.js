
const mongoose = require("mongoose");

let JobSchema = new mongoose.Schema({
  

   title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true
    },
    companyId: {
        type: String,
        required:true
    },

    applicants: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref:"UserModel"
    },
   
    createdAt: {
        type: Date,
        immutable: true,
        default: () => { Date.now() }
    },
    updatedAt: {
        type: Date,
        default: () => { Date.now() }
    }


})

let model = mongoose.model("JobModel", JobSchema)

module.exports = model;










