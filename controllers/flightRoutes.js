const {FlightModel} = require("../models/flightmodel.model")
const express = require('express');
const flightRouter = express.Router()

flightRouter.get("/",async(req,res)=>{
    let flightData =await FlightModel.find()
    res.send(flightData)
})
 
flightRouter.get("/:id",async(req,res)=>{
    let id= req.params.id;
    let flightData =await FlightModel.findOne({_id:id})
    if(flightData){
        res.send(flightData)
    }else{
        res.send({"msg":"data not found"})
    }
})

flightRouter.post("/",async(req,res)=>{
    const {airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price} = req.body;

    let y = new Date('December 19, 1975 23:15:30')
    const payload = await FlightModel({airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price})
    payload.save()
    res.status(201)
    res.send("Flight Has been added")
})

flightRouter.patch("/:id",async(req,res)=>{
    let id= req.params.id;
    let data = await FlightModel.findOne({_id:id})
    let {airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price} = req.body;
    if(data){
        let flightData =await FlightModel.findByIdAndUpdate({_id:id},{airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price})
        res.status(204)
        res.send({"msg":"Data has been Deleted"})
    }else{
        res.status(403)
        res.send("Data Not found")
    }
})

flightRouter.delete("/:id",async(req,res)=>{
    let id= req.params.id;
    let data = await FlightModel.findOne({_id:id})
    if(data){
        let flightData =await FlightModel.findByIdAndDelete({_id:id})
        res.status(202).send({"msg":"Data has been Deleted"})
    }else{
        res.status(403)
        res.send({"msg":"Data Not found"})
    }

})

module.exports={
    flightRouter
}


// {
//     "airline":"Air India",
//     "flightNo":3,
//     "departure":"Kolkata",
//     "arrival":"Mumbai",
//     "departureTime": "December 19, 1975 07:15:30",
//     "arrivalTime":  "December 19, 1975 11:15:30",
//     "seats":3,
//     "price":4000
// }