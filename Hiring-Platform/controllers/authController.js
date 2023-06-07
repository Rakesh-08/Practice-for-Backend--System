let UserModel = require("../models/UserModel")
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs")
let { secretKey } = require("../configs/authConfig")

const signup = async (req, res) => {
    
    try { 
    let user = await UserModel.create({
      
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8),
        role:req.body.role,

    })
    let resObject = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        id: user._id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
  
     
        res.status(200).send(resObject)
        
    } catch (err) {
        res.status(500).send({
            message: "some internal server error occured"
        })
    }


}

const signin = async (req, res) => {
    
    try { 

    let user = await UserModel.findOne({
        email:req.body.email
    })

    if (!user) {
        return res.status(200).send({
            message:"user with given email doesn't exist"
        })
    }

    let isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
    
    if (!isPasswordCorrect) {
        return res.status(200).send({
            message:"Failed ! incorrect password"
        })
    }

    let accessToken = jwt.sign({ id: user._id }, secretKey, {
        expiresIn:87500
    })

    res.status(200).send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        accessToken: accessToken,
        id: user._id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    })
        
    } catch (err) {
        res.status(500).send({
            message:"some internal server error occured"
        })
    }
}

module.exports = {
    signin,
    signup
}



