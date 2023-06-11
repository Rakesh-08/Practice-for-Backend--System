
let {
   addOrUpdateLocation,
    deleteLocation,
    getStudentsDensity
}= require("../controllers/locationController")
let tokenVerification=require("../middlewares/tokenVerification")

module.exports = (app) => {
    
    app.post("/Locations/api/v1/student_location/:studentId",addOrUpdateLocation);
    app.delete("/Locations/api/v1/student_location/:studentId",deleteLocation);
    app.get("/Locations/api/v1/student_density",getStudentsDensity)
}