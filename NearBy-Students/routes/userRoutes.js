let {
    createStudent,
    updateStudent,
    getAllStudents,
    getStudentById,
    deleteStudent
}= require("../controllers/userController")
let authValidator = require("../middlewares/authValidator");
let tokenVerification= require("../middlewares/tokenVerification")

module.exports = (app) => {
    
    app.post("/users/api/v1/students",authValidator,createStudent);
    app.put("/users/api/v1/students/:studentId",tokenVerification,updateStudent)
    app.get("/users/api/v1/students",tokenVerification,getAllStudents)
    app.get("/users/api/v1/students/:studentId",tokenVerification,getStudentById);
    app.delete("/users/api/v1/students/:studentId",tokenVerification,deleteStudent)
}