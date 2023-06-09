let {
    signUpAsHospital,
    signinAsHospital,
    updateHospital,
    getAllHospitals,
    getHospitalById,
    deleteHospital

} = require("../controllers/hospitalController");
let {tokenVerification}= require("../middlewares/verifyToken")
let hospitalValidator= require('../middlewares/hospitalValidator')
module.exports = (app) => {
    
    app.post("/fitnessApp/api/v1/auth/signupAsHospital",hospitalValidator,signUpAsHospital);
    app.post("/fitnessApp/api/v1/auth/signinAsHospital",signinAsHospital)
    app.put("/fitnessApp/api/v1/hospitals/:hospitalId",tokenVerification,updateHospital);
    app.get("/fitnessApp/api/v1/hospitals",tokenVerification,getAllHospitals);
    app.get("/fitnessApp/api/v1/hospitals/:hospitalId",tokenVerification,getHospitalById);
    app.delete("/fitnessApp/api/v1/hospitals/:hospitalId",tokenVerification,deleteHospital);
}