const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: Number
  },{timestamps:true});

module.exports = mongoose.model('user',userSchema);

