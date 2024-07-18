const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  location: String,
  vehicleType: String,
  parkingSpaceType:String
},{
    timestamps: true
});
module.exports = mongoose.model("FindSpaceUserData", UserDataSchema);
