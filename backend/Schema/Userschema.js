  const mongoose = require('mongoose')

  const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
  }, { timestamps: true });
  
  const UserDataModel = mongoose.model('UserDatas',userSchema,'UserAuthDatas');
  module.exports = UserDataModel;