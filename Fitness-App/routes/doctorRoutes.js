
let doctorValidator = require("../middlewares/doctorValidator");
let { tokenVerification } = require("../middlewares/verifyToken")
let {
    addDoctor,
    updateDoctor,
    getAllDoctors,
    getDoctorById,
    removeDoctor
} = require("../controllers/doctorController");

module.exports = (app) => {
    
    app.post("/fitnessApp/api/v1/doctors",[doctorValidator,tokenVerification],addDoctor);
    app.update("/fitnessApp/api/v1/doctors/:doctorId",tokenVerification,updateDoctor);
    app.delete("/fitnessApp/api/v1/doctors/:doctorId",tokenVerification,removeDoctor);
    app.get("/fitnessApp/api/v1/doctors/:doctorId",tokenVerification,getDoctorById);
    app.get("/fitnessApp/api/v1/doctors",tokenVerification,getAllDoctors)
}

