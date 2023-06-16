const jwt = require("jsonwebtoken");
require("dotenv").config()

const authentication=(req,res,next)=>{
    let token = req.headers.authorization;

    if(!token){
        return res.send({status:"FAILED","msg":"please log in"})
    }
    const decode= jwt.verify(token,process.env.userkey);
    if(!decode){
        return res.send({status:"FAILED","msg":"please log in"})        
    }else{
        const userID = decode.userID;
        req.headers.userID=userID;
        next() 
    }  
}

module.exports={
    authentication
}