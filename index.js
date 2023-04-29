const express = require('express')
const app = express()
const UserRouter = require('./Routers/user.router')
const RestaurentRouter = require('./Routers/restaurent.router')
const connection = require('./config/db')
const { ConnectionStates } = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 8999;
app.use(express.json())
app.use('/api',UserRouter);
app.use('/api',RestaurentRouter);


app.listen(PORT,async()=>{
    
    console.log(`http://localhost:${PORT}`)
    try{
        await connection
        console.log('connected to database')
    }catch(err){
        console.log('error while connecnting db')
    }
})