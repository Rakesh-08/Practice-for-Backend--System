let studentModel= require("../models/userModel")

let addOrUpdateLocation = async (req, res) => {
    try {

        if (!req.body.longitude || !req.body.latitude) {
            return res.status(400).send({
            message:"please pass the location coordinates"
        })
    }

        let student = await studentModel.findOne({
            _id:req.params.studentId
        })

        

        let address = {
            type: "Point",
            coordinates:[req.body.longitude,req.body.latitude]
      }
     
        student.location = address;
        await student.save();
       

        res.status(200).send(student)

    } catch (err) {
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }
    
}


let deleteLocation = async (req, res) => {

    try {

        let student = await studentModel.findOne({
            _id:req.params.studentId
        })

        if (student.location) {
           
            student.location = undefined;
            student.save();
            res.status(200).send(student)
            
        } else {
            res.status(400).send({
                message:"student details doesn't have location details"
            })
        }


    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

let getStudentsDensity = async (req, res) => {

    try {

        let query = {
            minDistance: 0,
            maxDistance: 1000
        }

        let coordinatesPassed = req.body.coordinates
        
       

        if (req.query.minDistance) {
            query.minDistance=req.query.minDistance
        }
        if (req.query.maxDistance) {
            query.maxDistance=req.query.maxDistance
        }

        let students = await studentModel.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: coordinatesPassed },
                    $minDistance: query.minDistance,
                    $maxDistance: query.maxDistance
                    
                },
               
            }
        })

        if (students.length !== 0) {
            res.status(200).json({
                students: students,
                 studentsCount:students.length
            })
        }
        else {
            res.status(400).send({
                message:"No students exist near this location"
            })
        }


    } catch (err) {
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

module.exports = {
    addOrUpdateLocation,
   deleteLocation,
    getStudentsDensity
}



