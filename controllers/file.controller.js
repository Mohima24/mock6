

const {Usermodel} = require("../models/users.model");
const {FileModel} = require('../models/file.model');
const mongoose = require('mongoose');
const multer = require('multer');
const upload =  multer({ storage: multer.memoryStorage() });

exports.uploadFile = async(req,res)=>{

  const { originalname, mimetype, buffer } = req.file;
  const code = Math.floor(100000+Math.random()*900000);
  const userID = req.headers.userID;
  try {

    const user = await Usermodel.findById({_id:userID})

    if(!user){
      return res.status(500).send({status:"FAILED",message:"Please logged-in"})
    }
    // Create a new file document
    const newFile = new FileModel({
        filename: originalname,
        fileType: mimetype,
        fileData: buffer,
        fileCode:code,
        userId:userID
    });
    user.files.push(newFile._id)
    // Save the file to MongoDB
    await newFile.save()
    await user.save();
    res.send({status:"OK",message:"File Uploaded",code});

  } catch (error) {
    res.send({status:"FAILED",message:error});
  }
}

exports.getFile = async (req, res) => {

  const { fileId ,code } = req.params;
  const userID = req.headers.userID;
  // console.log("hello")
  try{
    const file =await FileModel.findById({_id:fileId})
    if (!file) {
        return res.send({status:"FAILED",message:'File not found'});
    }
    if(userID!=file.userId){
        return res.send({status:"FAILED",message:'Not Authorized'});
    }
    
    if(file.fileCode!=code){
      return res.send({status:"FAILED",message:'Enter Valid Code'});
    }
    res.setHeader('Content-Type', file.fileType);
    
    res.set({
      'Content-Disposition': `attachment; filename=${file.filename}`,
      'Content-Type': 'application/octet-stream',
    })
    res.send({data:file.fileData});
  }catch(err){
    console.log(err)
  }
};

exports.getAllFile = async (req, res) => {
    const userID = req.headers.userID;
  
    try{

      const userFileData = await Usermodel.aggregate([
        { 
            $match: { $expr : { $eq: [ '$_id' , { $toObjectId: userID } ] } } 
        },
        {
            "$unwind": "$files"
        },
        {
            "$lookup": {
              "from": "files",
              "localField": "files",
              "foreignField": "_id",
              "as": "files"
            }
          },
          {
            "$unwind": "$files"
            },
          {
            "$group": {
              "_id": "$_id",
              "files": {"$push": "$files"}
            }
          },
      ])
    res.send(userFileData)

    }catch(err){
      console.log(err)
      res.send(err)
    }
};
  
exports.deleteFile = async (req, res) => {

  const { fileId } = req.params;
  const userID = req.headers.userID;
  try{
    const file =await FileModel.findById({_id:fileId})
    const user = await Usermodel.findById({_id:userID})
    if(!file){
      return res.send({status:"FAILED",message:"File Not Found"})
    }
    if(!user){
      res.send({status:"FAILED",message:"User Not Authorised"})
    }
    if(userID==file.userId){
      await FileModel.findByIdAndDelete({_id:fileId});
      await Usermodel.findByIdAndUpdate({_id:`${userID}`},
      {'$pull':{'files': new mongoose.Types.ObjectId(`${fileId}`)}},
      { new: true }
      )
      return res.send({status:"DELETED","messege":"Deleted Successfully"})
    }else{
      return res.send({status:"FAILED","messege":"User Not Authorised"})
    }
  }catch(err){
    console.log(err)
  }
};