const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  fileType: String,
  fileData:Buffer,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  fileCode: Number
},{
  versionKey: false,
  timeStamps: true,
});

const FileModel = mongoose.model('File', fileSchema);

module.exports = {
    FileModel
}