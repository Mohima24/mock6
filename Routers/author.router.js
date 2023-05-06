const express = require('express');
const PostModel = require('../models/author.model')
const postRouter = express.Router();

postRouter.get("/",async(req,res)=>{
    const data = await PostModel.find()
    res.send(data)
})

postRouter.post('/post',async(req,res)=>{
    const {
        Author,
        Notice,
        Descriptio
    }= req.body;
    try{    
        const payload = await PostModel({
            Author,
            Notice,
            Descriptio,
            createdAt:`${new Date()}`
        })
        await payload.save()
        res.send({
            "msg":"data has posted"
        })
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

postRouter.patch('/post/:id',async(req,res)=>{
    const id = req.params.id;

    const {
        Author,
        Notice,
        Descriptio
    }= req.body;
    try{    
        const payload = await PostModel.findByIdAndUpdate({_id:id},{
            Author,
            Notice,
            Descriptio
        })
        res.send({
            "msg":"data has updated"
        })
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

postRouter.delete('/post/:id',async(req,res)=>{
    const id = req.params.id;

    try{    
        const payload = await PostModel.findByIdAndDelete({_id:id})
        res.send({
            "msg":"data has updated"
        })
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = postRouter;