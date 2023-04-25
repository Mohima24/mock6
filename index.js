const express = require('express')
const app = express()
const {conncetion} = require("./config/db")
const {userRouter} = require("./controllers/userRoutes")
const {flightRouter} = require("./controllers/flightRoutes")
const {bookingRouter} = require("./controllers/bookingRoutes")
require("dotenv").config()

app.use(express.json())

app.use("/api",userRouter)
app.use("/api/flights",flightRouter)
app.use("/api/booking",bookingRouter)

app.listen(2222,async()=>{
    console.log("http://localhost:2222")
    try{
        await conncetion
    }catch(err){
        console.log("error while connecting with mongoose")
        console.log(err)
    }
})