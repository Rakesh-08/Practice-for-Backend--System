

module.exports = async (req, res, next) => {
    
    if (!req.body.hospitalName) {
        return res.status(400).send({
            message:"please pass the hospital name"
        })
    }
 

    if (!req.body.department) {
        return res.status(400).send({
            message: "please pass the department you want to visit"
        })
    }
    
    next();


}







