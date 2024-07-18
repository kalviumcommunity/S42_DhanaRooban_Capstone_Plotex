const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  name:String,
  phoneNumber:Number,
  email:String,
  address:String,
  vehicle:String,
  ParkingSpaceType:String,
  country:String,
  countryCode:String,
  region:String,
  regionName:String,
  city:String,
  zip:Number,
  lat:Number,
  lon:Number,
  timezone:String,
},{
    timestamps: true
});
module.exports = mongoose.model("UserData", UserDataSchema);
