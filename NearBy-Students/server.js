
let mongoose = require("mongoose");
let dbConfig= require('./configs/dbConfig')
let serverConfig = require("./configs/serverConfig")

// express setup for the project

let express = require("express");
let bodyParser = require('body-parser');
let expressApp = express();

expressApp.use(bodyParser.json());
expressApp(bodyParser.urlencoded({extended:true}))

// mongodb establishment

mongoose.connect(dbConfig.DB_URL);

let dbConnection = mongoose.connection;
dbConnection.on("err", () => {
    console.log("error while connecting to the database")
}
)
dbConnection.once("open", () => {
    console.log("connected to mongodb database")
})



expressApp.listen(serverConfig.PORT, () => {
    console.log("your server is up and running")
})










