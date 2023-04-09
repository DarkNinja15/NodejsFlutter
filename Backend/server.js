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

app.listen(5000);