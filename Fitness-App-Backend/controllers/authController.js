
let userModel = require("../models/userModel")
let hospitalModel = require("../models/hospitalModel");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let passwordLessUser=require("../utils/secureResponse");
const authConfig = require("../configs/authConfig");


let signUp = async (req, res) => {

    try {
    
        let user = await userModel.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            userId: req.body.userId,
            password: bcrypt.hashSync(req.body.password, 8)
        })

        if (user) {
            res.status(200).send(passwordLessUser([user]))
        }
      
    } catch (err) {

       
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }
}

let signin = async (req, res) => {
    try {
        
    let user = await userModel.findOne({
        userId:req.body.userId
    })
    let hospital = await hospitalModel.findOne({
        userId: req.body.userId
    })

    let client= user || hospital


    if (!client) {
        return res.status(400).send({
        message:"user/hospital doesn't exits"
    })
    }
    
   
    let isCorrectPassword = bcrypt.compareSync(req.body.password, client.password)
    
    if (!isCorrectPassword) {
        res.status(400).send({
            message:"Failed! incorrect password"
        })
    }
    
    let accessToken = jwt.sign({ id: client._id }, authConfig.secretKey, { expiresIn: 84599 });
     client.accessToken= accessToken

        res.status(200).send(passwordLessUser([client]))
        
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "some internal server error occurred"
        })
    }
}

module.exports = {
    signUp,
    signin
    
}