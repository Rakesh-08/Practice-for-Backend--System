let  signUpValidator  = require("../middlewares/authValidators");
let {signUp,signin }= require("../controllers/authController")


module.exports = (app) => {
    
    app.post("/fitnessApp/api/v1/auth/signup", [signUpValidator],signUp);
    app.post("/fitnessApp/api/v1/auth/signin",signin)

}