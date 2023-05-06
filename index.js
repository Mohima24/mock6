const express = require('express')
const app = express();
const connection = require('./config/db')
const postRouter = require('./routers/author.router');
const cors = require('cors')

app.use(cors())

app.use(express.json());
app.use("/post",postRouter);



app.listen(5858,async()=>{
    console.log("http://localhost:5858/")
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