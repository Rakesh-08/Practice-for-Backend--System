let {signin,signup} = require("../controllers/authController");
let verifyToken= require("../middlewares/tokenValidator")
let {validateSignin,validateSignup} = require("../middlewares/authValidator")


module.exports = (app) => {
    
    app.post("/jobPortal/api/v1/auth/signup", [validateSignup], signup)
    app.post("/jobPortal/api/v1/auth/signin",[validateSignin],signin)
}









