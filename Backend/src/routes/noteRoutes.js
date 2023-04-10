const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Note = require("../models/note");

// notes page
router.post("/list", async function(req,res){
    console.log(req.body.userid);
    var notes = await Note.find({userid: req.body.userid});
    res.json(notes);
});


// add note
router.post("/add", async function(req,res){

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

// delete note
router.post("/delete", async function(req,res){
    await Note.deleteOne({id: req.body.id}).then(()=>{console.log("Note deleted")}).catch(e=>{console.log(e)});
    const response = {message: "Note deleted!"};
    res.json(response);
});

module.exports = router;