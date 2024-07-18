  const mongoose = require('mongoose')

  const userSchema = new mongoose.Schema({
    email: String,
    phoneNumber: Number,
    password: { type: mongoose.Schema.Types.Mixed, default: null }
    },{timestamps:true});

  module.exports = mongoose.model('User',userSchema);