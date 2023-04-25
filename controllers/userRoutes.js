const {UserModel} = require("../models/usermodel.model")
const express = require('express')
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
userRouter.get("/",(req,res)=>{
    res.send("user page")
})

userRouter.post("/register",async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        let data =await UserModel.find({email})
        if(data.length>0){
            res.send({"error":"user already register"})
            res.status(503)
            return
        }
        const payload = await UserModel({name,email,password})
        payload.save()
        res.status(201)
        res.send({"msg":"user has been register"})
    }catch(err){
        console.log("error while regiter a user")
        res.send({"error":err})
    }
})

userRouter.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;
        let data =await UserModel.findOne({email})
        if(data){
            if(password==data.password){
                let token = jwt.sign({"user":data._id},"userkey")
                res.status(201)
                res.send({"msg":"user has log in","token":token})
            }else{
                res.status(503)
                res.send({"msg":"Please enter correct credentials"})
            }
        }else{
            res.send({"msg":"Please enter correct credentials"})
        }
    }catch(err){
        console.log("error while regiter a user")
        res.send({"error":err})
    }
})

module.exports={
    userRouter
}