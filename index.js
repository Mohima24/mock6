const express = require('express')
const app = express();
const connection = require('./config/db')
const postRouter = require('./routers/author.router');
const cors = require('cors')
app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.send("hello worls")
})

app.use("/post",postRouter);



app.listen(3333,async()=>{
    console.log("http://localhost:3333/")
    try{
        connection
        console.log("database connect")
    }catch(err){
        console.log(err)
    }
})

// {
          
//     "Author":"Abc",
//     "Notice":"hello2",
//     "Descriptio":"job alert2"
      
//     }