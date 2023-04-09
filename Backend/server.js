const express = require("express");
const app = express();


// home page route
app.get("/",function(req,res){
    res.send("This is the homepage.");
});

// notes page
app.get("/notes",function(req,res){
    res.send("This is the notes page.");
});

// starting the server
app.listen(5000,function(){
    console.log("Server connected at port 5000");
});