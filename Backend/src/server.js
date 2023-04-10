const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const Note = require("./models/note");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// true -> Nested objects can be passed in the URL of the request.
// false -> Nested objects cannot be passed in the URL of the request.

mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("connected to database");
    app.get("/",function(req,res){
        // const response = {message: "API Works!"};
        // res.json(response);
        res.send("API Works!");
    });

    const noteRouter = require("./routes/noteRoutes");
    app.use("/notes",noteRouter);


}).catch(e=>{
    console.log(e);
})

// starting the server
app.listen(process.env.PORT,function(){
    console.log("Server connected at port 5000");
});