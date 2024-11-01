const mongoose = require('mongoose');

// Schema for local users
const LocalUserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Schema for Google users
const GoogleUserSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  givenName: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

const UserDataModel = mongoose.model('LocalUsers', LocalUserSchema);
const GoogleUserModel = mongoose.model('GoogleUsers', GoogleUserSchema);

module.exports = {
  UserDataModel,
  GoogleUserModel
};