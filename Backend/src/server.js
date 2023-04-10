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
        const response = {message: "API Works!"};
        res.json(response);
    });

    // notes page
    app.post("/notes/list", async function(req,res){
        console.log(req.body.userid);
        var notes = await Note.find({userid: req.body.userid});
        res.json(notes);
    });


    // add note
    app.post("/notes/add", async function(req,res){

        // used so that duplicate notes are not added
        await Note.findOne({id: req.body.id}).then(async function(note){
            if(note){
                console.log("Note already exists");
                await Note.deleteOne({id: req.body.id}).then(()=>{console.log("Note deleted")}).catch(e=>{console.log(e)});
            }
        }).catch(e=>{console.log(e)});

        const newNote = new Note({
            id: req.body.id,
            userid: req.body.userid,
            title: req.body.title,
            content: req.body.content,
        });
        await newNote.save().then(()=>{
            console.log("Note added");
        }).catch(e=>{console.log(e)});
        const response = {message: "Note added! "+`id: ${req.body.id}`};
        res.json(response);
    });

    app.post("/notes/delete", async function(req,res){
        await Note.deleteOne({id: req.body.id}).then(()=>{console.log("Note deleted")}).catch(e=>{console.log(e)});
        const response = {message: "Note deleted!"};
        res.json(response);
    });


}).catch(e=>{
    console.log(e);
})

// starting the server
app.listen(process.env.PORT,function(){
    console.log("Server connected at port 5000");
});