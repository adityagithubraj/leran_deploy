const mongoose=require("mongoose")

const notesschema=mongoose.Schema({
    title:String,
    content:String,
    author: String
},{versionkey:false})

const notemodel=mongoose.model("note",notesschema)

module.exports={notemodel}