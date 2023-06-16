const express = require("express");
const fileRouter = express.Router();
const {authentication} = require("../middleware/authentication");
const multer = require('multer');
const upload =  multer({ storage: multer.memoryStorage() });
const fileController = require("../controllers/file.controller");
const {Usermodel} = require("../models/users.model");
const {FileModel} = require('../models/file.model');
const mongoose = require('mongoose')

fileRouter.post("/upload",authentication,upload.single('file'),fileController.uploadFile)
fileRouter.get('/:fileId/:code',authentication,fileController.getFile)
fileRouter.get('/',authentication,fileController.getAllFile);

fileRouter.delete("/delete/:fileId",authentication,fileController.deleteFile)

module.exports={
  fileRouter
}