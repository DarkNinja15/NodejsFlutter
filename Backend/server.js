const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

app.use(express.json());


mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("connected to database");
    app.get("/",function(req,res){
        res.send("This is the homepage.");
    });

    // notes page
    app.get("/notes",function(req,res){
        res.send("This is the notes page.");
    });
}).catch(e=>{
    console.log(e);
})

// starting the server
app.listen(process.env.PORT,function(){
    console.log("Server connected at port 5000");
});