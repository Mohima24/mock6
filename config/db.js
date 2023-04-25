const mongoose = require('mongoose')
require('dotenv').config()

const conncetion = mongoose.connect("mongodb+srv://Mohima:mohima@cluster0.nniwend.mongodb.net/mockexam?retryWrites=true&w=majority")

module.exports={
    conncetion
}