const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  location: String,
  vehicleType: String,
  MobileNumber: Number,
  currentlocation: {
    type: Object,
    default: {}
  }
}, {
    timestamps: true
});

module.exports = mongoose.model("FindSpaceUserData", UserDataSchema);