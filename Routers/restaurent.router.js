const express = require('express')
const RestaurentRouter = express.Router()
const RestaurentModel = require('../models/Restaurant.Model')

RestaurentRouter.get("/restaurants",async(req,res)=>{
    let data = await RestaurentModel.find()
    if(data.length>0){
        res.send(data)
    }else{
        res.status(403).send({"msg":"No restaurent found"})
    }
})

RestaurentRouter.get("/restaurants/:id",async(req,res)=>{
    const restaurentID =  req.params.id;
    try{
        let data = await RestaurentModel.find({_id:restaurentID})
        res.send(data)
    }catch(err){
        res.send({"msg":err,restaurentID})
    }
})
RestaurentRouter.get("/restaurants/:id/menu",async(req,res)=>{
    const restaurentID =  req.params.id;
    try{
        let data = await RestaurentModel.find({_id:restaurentID})
        res.send(data[0].menu)
    }catch(err){
        res.send({"msg":err,restaurentID})
    }
})
RestaurentRouter.put("/restaurants/:id/menu",async(req,res)=>{
    const restaurentID =  req.params.id;
    const {
        name,
        description,
        price,
        image
      }= req.body;
      let data = await RestaurentModel.find({_id:restaurentID})
    try{
        if(data.length>0){
            let newmenu = data[0].menu.push({
                name,
                description,
                price,
                image
              }) 
              let newdata =  await RestaurentModel.findOneAndReplace({_id:restaurentID},data[0])
              res.send(data)
        }
        // res.send({"msg":"restaurent added"})
    }catch(err){
        console.log(err)
        // res.send({"msg":err,restaurentID})
    }
})



RestaurentRouter.post("/post",async(req,res)=>{
    const {name,
    address} = req.body;
    let data = await RestaurentModel({name,
        address})
    await data.save()
    res.send({"msg":"restairent added"})
})

module.exports = RestaurentRouter