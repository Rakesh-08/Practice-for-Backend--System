
let { getAllUsers, getUserById } = require("../controllers/userController");
let { isAdmin,verifyToken }= require("../middlewares/tokenValidator")

module.exports = (app) => {
    app.get("/jobPortal/api/v1/users", [verifyToken, isAdmin], getAllUsers);
    app.get("/jobPortal/api/v1/users/:userId",[verifyToken,isAdmin],getUserById)
}