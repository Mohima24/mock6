const express = require('express')
const UserRouter = express.Router()
const Usermodel = require('../models/User.Model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

UserRouter.get("/",(req,res)=>{
    res.send('user page')
})

UserRouter.post("/register",async(req,res)=>{
    const {
    name,
    email,
    password,
    address
} = req.body;
    try{
        bcrypt.hash(password, 7, async(err, hash) => {
            if(err){
                console.log("while hashing the password")
                res.send(501)
            }else{
                let payload = await Usermodel({
                    name,
                    email,
                    password:hash,
                    address
                })

                await payload.save()
                res.status(201)
                res.send({"msg":"data has uploaded"})
            }
        })

    }catch(err){
        console.log(err)
    }
})
UserRouter.post("/login",async(req,res)=>{
    const {
    email,
    password
} = req.body;
    try{
        let data = await Usermodel.find({email})
        if(data.length>0){
            bcrypt.compare(password, data[0].password, async(err, result)=> {
                if(result){
                    const token = jwt.sign({"userID":data[0]._id,useremail:data[0].email},'usertoken')
                    res.status(201).send({"msg":"user has log in",token})
                }else{
                    res.status(501).send({"msg":"Wrong credentials"})
                }
            })
        }else{
            res.status(501).send({"msg":"Wrong credentials"})
        }
    }catch(err){
        console.log(err)
    }
})

UserRouter.patch("/user/:id/reset",async(req,res)=>{
    let userID = req.params.id;
    let currentpass = req.body.currentpass
    let newpass = req.body.password;
    let data = await Usermodel.findById({_id:userID})
    if(data){
        bcrypt.compare(currentpass, data.password, async(err, result)=> {
            console.log(currentpass)
            if(result){
                bcrypt.hash(newpass, 7, async(err, hash) => {
                    if(err){
                        console.log("while hashing the password")
                        res.send(501)
                    }else{
                        await Usermodel.findByIdAndUpdate({_id:userID},{password:hash})
                        res.status(204).send({"msg":"password has updated"})
                    }
                })
            }else{
                res.status(501).send({"msg":"Wrong current passwords"})
            }
        })
    }else{
        res.status(403).send({"msg":"usernot found"})
    } 
})

module.exports = UserRouter;

// {"name": "String",
// "email": "mohima@gmail.com",
// "password": "mohima",
// "address":{
//   "street": "String",
//   "city": "String",
//   "state": "String",
//   "country": "String",
//   "zip": "String"
// },
// "currentpass":"String"
// }

// {
//     "currentpass":"mohima",
//     "password":"String"
//   }