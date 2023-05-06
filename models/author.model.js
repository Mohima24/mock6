const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
Author:String,
Notice:String,
Descriptio:String,
createdAt:Date
})
const PostModel = mongoose.model('Postmodels',postSchema);
module.exports = PostModel;
