let UserModel = require("../models/UserModel");
let {passwordLessUser}= require("../utils/secureResponse")

let getAllUsers = async (req, res) => {

    try { 
    
    let query = {};

    if (req.query.role) {
        query.role = req.query.role
    }

  let Users = await UserModel.find(query)
      
   if (Users) {
            
        res.status(200).send(passwordLessUser(Users))
    } else {
        res.status(200).send({
            message:"Failed! No user exist "
        })
        }
    } catch (err) {
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }

}

let getUserById = async (req, res) => {
    try { 

        let user = await UserModel.findOne({
            _id:req.params.userId
        })

        if (user) {
            res.status(200).send(passwordLessUser([user]))
        } else {
            res.status(200).send({
                message:"No user exist with the given id"
            })
        }



    } catch (err) {
        res.status(500).send({
            message:"some internal server error occurred"
        })
    }

}


module.exports = { getAllUsers, getUserById }