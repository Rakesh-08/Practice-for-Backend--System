let {
    createRecord,
    updateRecord, deleteRecord,
    getAllRecords,
    getRecordById
}= require("../controllers/recordsController")
let { tokenVerification } = require("../middlewares/verifyToken");
let recordValidator= require("../middlewares/recordsValidator")
let { IsHospital } = require("../middlewares/doctorValidator")

module.exports = (app) => {
    
    app.post("/fitnessApp/api/v1/records",[tokenVerification,IsHospital,recordValidator],createRecord)
    app.put("/fitnessApp/api/v1/records/:recordId",[tokenVerification,IsHospital],updateRecord)
    app.delete("/fitnessApp/api/v1/records/:recordId",[tokenVerification,IsHospital],deleteRecord)
    app.get("/fitnessApp/api/v1/records",tokenVerification,getAllRecords)
    app.get("/fitnessApp/api/v1/records?:recordId",tokenVerification,getRecordById)
}