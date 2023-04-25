const {BookingModel} = require("../models/bookflight.model")
const {FlightModel} = require("../models/flightmodel.model")
const {UserModel} = require("../models/bookflight.model")
const express = require('express')
const bookingRouter= express.Router()

bookingRouter.get("/dashboard",async (req,res)=>{
    let data = await BookingModel.find()
    // let userID = req.userid.user;
    // let flightID = req.body.flight;
    // console.log(data)
    // let userDetails = await UserModel.findOne({_id:userID})
    // let flightDetails = await FlightModel.findOne({_id:flightID})
    // let obj = {
    //     userDetails:userDetails,
    //     flightDetails:flightDetails
    // }
    // res.send(data)
})
bookingRouter.post("/",async(req,res)=>{
    let userID = req.body.userid;
    let flightID = req.body.flightid;
    try{
        let flightSeat = await FlightModel.findOne({_id:flightID})
        let seat = flightSeat.seats
        if(seat>0){
            seat--;
            await FlightModel.findByIdAndUpdate({_id:flightID},{seats:seat})
            let payload = await BookingModel({user:userID,flight:flightID})
            await payload.save()
            res.send({"msg":"flight book"})
        }else{
            res.send({"msg":"Seats is not available"})
        }

        // await payload.save()
    }catch(err){
        console.log(err)
        res.send("error")
    }
})

module.exports={
    bookingRouter
}