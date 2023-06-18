
module.exports = async (req, res,next) => {
    
    if (!req.body.appointmentId) {
        return res.status(400).send({
            message:"please provide the appointmentId "
        })
    }

    if (!req.body.statusReport) {
        return res.status(400).send({
            message:"please provide the status report of the patient"
        })
    }

    if (!req.body.prescription) {
        return res.status(400).send({
            message:"please provide the prescription"
        })
    }

    if (!req.body.dosage) {
        return res.status(400).send({
        message:"please specify the dosage of your prescription"
    })
}

    next();
}