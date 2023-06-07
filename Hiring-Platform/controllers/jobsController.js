let jobsModel = require("../models/JobsModel");
let UserModel = require("../models/UserModel");
let constants = require("../utils/constants");
let {applicantsLessJobs }= require("../utils/secureResponse")


let createJobs = async (req, res) => {

    try { 

    let job = await jobsModel.create({
        title: req.body.title,
        description: req.body.description,
        companyId: req._id  // its coming from the decoded token
    })

    res.status(200).send({
        id:job._id,
        title: req.body.title,
        description: req.body.description,
        companyId: req._id,
        createdAt: job.createdAt,
        updatedAt:job.updatedAt

    })
    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}

let updateJobById = async (req, res) => {

    try {

    let job = await jobsModel.findOne({
    _id:req.params.JobId
    })

    let editable = ["title", "description", "applicants"];

    Object.keys(req.body).forEach(element => {

        if (!editable.includes(element)) {
            return res.status(401).send({
                message: "you can't update this part of the job"
            })
        }
    });
    let update={}

    let user = await UserModel.findOne({
        _id: req._id
    })

    if (user.role==constants.roles.company && !(job.companyId == req._id)) {

        res.status(401).send({
            message: "Unauthorised request "
        })

    }

    if (user.role == constants.roles.company) {

        if (req.body.title) {
            update.title = req.body.title;
        }
        if (req.body.description) {
            update.description = req.body.description
        }

    } else if (user.role == constants.roles.student) {
        update["$push"] = {
            applicants:req._id
        }
    }

    let updatedResult = await jobsModel.findOneAndUpdate({
        _id: req.params.JobId
    }, update, {
        new: true
    })

        if (updatedResult) {
        
            if (user.role == constants.roles.student) {
                res.status(200).send(applicantsLessJobs([updatedResult]))
            } else {
                res.status(200).send(app)
            }
    } else {
        res.status(400).send({
            message:"There is no job left after update"
        })
    }
   } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}

let deleteJobs = async (req, res) => {

    try { 
    let job = await jobsModel.findOne({
        _id:req.params.JobId
    })

    if (!(job.companyId == req._id )) {

        res.status(401).send({
            message: "Unauthorised request "
        })

    }
    let jobToBeDeleted = await jobsModel.deleteOne({
        _id: req.params.JobId
    })

    if (jobToBeDeleted) {
        res.status(200).send(jobToBeDeleted)
        }
    
    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
   

}

let getAllJobs = async (req, res) => {


    try { 

    let user = await UserModel.findOne({
        _id: req._id
    })


    let userStatus = user.role;
    let response;

    if (userStatus == constants.roles.student) {
        response = await jobsModel.find({
            applicants: req._id

        })
        response= applicantsLessJobs(response)

    } else if (userStatus == constants.roles.company) {
        response = await jobsModel.find({
            companyId: req._id
        })

    } else {
        response = await jobsModel.find({})

    }

    if (response) {
        res.status(200).send(response)
    } else {
        res.send(200).send({
            message: "There is no jobs to show"
        })
        }
    
    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }

}

let getJobById = async (req, res) => {
    
    try { 

    let job = await jobsModel.findOne({
        _id: req.params.JobId
    })

    if (!job) {
        return res.status(400).send({
            message: "There is no such job exist with given id "
        })
    }

        if (job.applicants.includes(req._id)) { 
            
            res.status(200).send(applicantsLessJobs([job]))
            
        } else if (job.companyId == req._id) {
            res.status(200).send(job)
        } 
    
        
} catch (err) {
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }
}



module.exports = {
    createJobs,
    updateJobById,
    deleteJobs,
    getAllJobs,
    getJobById
}