
let {
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById
}= require("../controllers/userController")
let { tokenVerification } = require("../middlewares/verifyToken")
let{IsHospital}= require("../middlewares/doctorValidator")


module.exports = (app) => {
    
    app.put("/fitnessApp/api/v1/user/:userId",tokenVerification,updateUser);
    app.get("/fitnessApp/api/v1/user/:userId",tokenVerification,getUserById);
    app.get("/fitnessApp/api/v1/users",[tokenVerification,IsHospital], getAllUsers);
    app.delete("/fitnessApp/api/v1/user/:userId",tokenVerification,deleteUser);
}



