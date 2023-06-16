const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    verify: {
      type: Boolean,
      default: false
    },
    files:[]
  },
  {
    versionKey: false,
    timeStamps: true,
  }
);

const Usermodel = mongoose.model("User", userSchema);

module.exports = {
  Usermodel
};