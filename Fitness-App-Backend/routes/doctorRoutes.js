


let {doctorValidator,IsHospital}= require("../middlewares/doctorValidator")
let { tokenVerification}= require("../middlewares/verifyToken")
let{
        createDoctor,
        updateDoctor,
        getAllDoctors,
        getDoctorById,
        deleteDoctor
} = require("../controllers/doctorController")

module.exports = (app) => {
    
    app.post("/fitnessApp/api/v1/doctor", [tokenVerification, IsHospital, doctorValidator], createDoctor);
    app.put("/fitnessApp/api/v1/doctor/:doctorId", [tokenVerification, IsHospital], updateDoctor);
    app.delete("/fitnessApp/api/v1/doctor/:doctorId", [tokenVerification,IsHospital], deleteDoctor);
    app.get("/fitnessApp/api/v1/doctor/:doctorId", [tokenVerification], getDoctorById);
    app.get("/fitnessApp/api/v1/doctors", [tokenVerification, IsHospital], getAllDoctors)
}

