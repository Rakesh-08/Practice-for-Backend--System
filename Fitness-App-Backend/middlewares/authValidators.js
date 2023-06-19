let UserModel = require("../models/userModel");

let signUpValidator = async (req, res, next) => {

  // for the firstName
    if (!req.body.firstName) {
        return res.status(400).send({
            message:"please provid your firstName"
        })
    }

    // for the lastName
    if (!req.body.lastName) {
      return  res.status(400).send({
            message:  "please provid your lastName"
        })
    }

    // for the email
    if (!req.body.email) {
       return res.status(400).send({
            message:  "please provid your emailid"
        })
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
        return res.status(400).send({
            message: "please put valid email "
        })
    }


    let isEmailAlreadyExist = await UserModel.findOne({
        email: req.body.email
    })

    if (isEmailAlreadyExist) {
        return res.status(400).send({
            message: "failed! this email is already in use with other account"
        })
    }

    // for the phone number
    if (!req.body.phone) {
        return res.status(400).send({
            message:  "please provid your contact number"
        })
    }

    // for the userId
    if (!req.body.userId) {
       return res.status(400).send({
            message: "please provid  userId , it can't be empty "
        })
    }

    let isUserAlreadyExist = await UserModel.findOne({
              userId:req.body.userId
    })

    if (isUserAlreadyExist) {
        return res.status(200).send({
            message:"user already have an account with the given userId"
        })
    }
    // for the password
    if (!req.body.password) {
       return res.status(400).send({
            message:  "please provid password , it can't be empty"
        })
    }

    next();
    

}


module.exports= signUpValidator






