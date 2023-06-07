let { verifyToken, isCompany } = require("../middlewares/tokenValidator");
let jobValidator = require("../middlewares/jobValidator");
let { createJobs,updateJobById,deleteJobs,getAllJobs,getJobById }= require("../controllers/jobsController")

module.exports = (app) => {
    
    app.post("/jobPortal/api/v1/Jobs", [verifyToken, isCompany,jobValidator], createJobs);
    app.put("/jobPortal/api/v1/Jobs/:JobId", [verifyToken], updateJobById);
    app.delete("/jobPortal/api/v1/Jobs/:JobId", [verifyToken, isCompany],deleteJobs);
    app.get("/jobPortal/api/v1/Jobs", [verifyToken],getAllJobs);
    app.get("/jobPortal/api/v1/Jobs/:JobId", [verifyToken],getJobById);
}

