const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb+srv://Mohima:mohima@cluster0.nniwend.mongodb.net/authorpost');

module.exports = connection;