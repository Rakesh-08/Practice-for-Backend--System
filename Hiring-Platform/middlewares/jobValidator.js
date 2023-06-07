module.exports = (req, res, next) => {
    
   // title
    if (!req.body.title) {
        return res.status(400).send({
            message:"please Provide the title to this job ad"
        })
    }

   // description
    if (!req.body.description) {
        return res.status(400).send({
            message: "please put on job description, it can't be empty"
        })
    }


   
    next();
}