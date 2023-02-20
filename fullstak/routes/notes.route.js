const express=require("express");
const app=express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const noteRouter=express.Router();
const {notemodel}=require("../model/notes.model")

app.use(express.json());

noteRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"masai",async(err,decoded)=>{
            if(decoded){
                const notes= await notemodel.find({author:decoded.userid})
                res.send(notes)
            }else{
                res.send({msg:"wrong token"})
            }
        })
    }else{
        res.send("Please login first")
    }
})
noteRouter.post("/create",async(req,res)=>{
    try {
        const payloade=req.body;
        const newnote= await notemodel(payloade);
        newnote.save();
        res.send({msg:"new note created"})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    }
})
noteRouter.patch("/update/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const payloade=req.body;
        await notemodel.findByIdAndUpdate(id,payloade)
        res.send({"msg":`note with id:${id} has been updated`})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    
    }
})
noteRouter.delete('/delete/:id',async(req,res)=>{
    const noteId=req.params.id;
    await notemodel.findByIdAndDelete({_id:noteId})
    res.send({"msg":`note with id:${noteId} has been deleted`})
})


module.exports={
    noteRouter
}