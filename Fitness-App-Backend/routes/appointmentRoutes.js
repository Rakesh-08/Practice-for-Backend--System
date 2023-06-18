
let appointmentValidator = require("../middlewares/appointmentValidator");
let { tokenVerification } = require("../middlewares/verifyToken")
let { bookAppointment,
    updateAppointment,
    deleteAppointment,
    getAllAppointments,
    getAppointmentById }= require("../controllers/appointmentController")

module.exports = (app) => {
    
    app.post("/fitnessApp/api/v1/appointment",[tokenVerification,appointmentValidator],bookAppointment);
    app.put("/fitnessApp/api/v1/appointment/:appointmentId",tokenVerification,updateAppointment);
    app.get("/fitnessApp/api/v1/appointment/:appointmentId",tokenVerification,getAppointmentById);
    app.get("/fitnessApp/api/v1/appointments",tokenVerification,getAllAppointments);
    app.delete("/fitnessApp/api/v1/appointment/:appointmentId",tokenVerification,deleteAppointment)
}

