// Steps:
// 1. Define the schema for the note model(id,userid,title,content,dateadded)
// 2. Define the model for the note schema(model name, schema)
// 3. Export the model

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    dateadded: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Note", noteSchema);