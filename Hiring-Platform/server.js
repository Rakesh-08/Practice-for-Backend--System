
let mongoose = require("mongoose");
let { PORT } = require("./configs/serverConfig");
let dbConfig = require("./configs/dbConfig")
let UserModel = require("./models/UserModel");
let bcrypt= require("bcryptjs")

// expressjs setup for the project

let express = require("express");
let expressApp = express();
let bodyParser = require("body-parser");

expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));

// establish connection with mongodb;

mongoose.connect(dbConfig.DB_URL);

let dbConnection = mongoose.connection;

dbConnection.on("err",()=> {
    console.log("error occurred while connecting to the db  " )
})
dbConnection.once("open",()=> {
    console.log("connection with mongodb successfull")

    createAdmin();
})


// import all the routes ;

require("./routes/authRoutes")(expressApp);
require("./routes/jobsRoute")(expressApp)

// landing page of server
expressApp.get("/", (req, res) => {
    res.send(
        " This is your home page "
    )
});


let createAdmin = async () => {
    
    let isAdminExist = await UserModel.findOne({
        role:"ADMIN"
    })
    if (isAdminExist) {
        console.log("admin already exist")
        return
    }
    let admin = await UserModel.create({
        firstName: "Rakesh",
        lastName: "Mandal",
        email: "Mandal8285@gmail.com",
        password:bcrypt.hashSync("mandalSir",8),
        role: "ADMIN",
        
    })
    console.log("admin created for you jobPortal backend service")
}
expressApp.listen(PORT, () => {
    console.log("congrats your server is lisening at port : " + PORT)
}
)





