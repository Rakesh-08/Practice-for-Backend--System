
let { PORT }= require("./configs/serverConfig")
let mongoose = require("mongoose");
let { DB_Name, DB_URL } = require("./configs/dbConfig");



mongoose.connect(DB_URL);
let dbConnection = mongoose.connection;

dbConnection.on("err", () => {
      console.log("error occurred while connecting to db")
})
dbConnection.once("open", () => {
    console.log("connection with mongodb successfull")
})

require("dotenv").config();

let express = require("express");
let bodyParser = require("body-parser");
let expressApp = express();
let cors = require("cors");

expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(cors())

// import the routes

require("./routes/authRoutes")(expressApp);
require("./routes/hospitalRoutes")(expressApp);
require("./routes/doctorRoutes")(expressApp);
require("./routes/userRoutes")(expressApp);
require("./routes/appointmentRoutes")(expressApp);
require("./routes/recordsRoutes")(expressApp)

expressApp.listen(PORT, () => {
    console.log("your server is up and running at " + PORT)
})



















