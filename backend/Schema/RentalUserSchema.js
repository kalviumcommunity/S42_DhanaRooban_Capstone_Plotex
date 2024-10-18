const mongoose = require('mongoose');

const RentalUserSchema = new mongoose.Schema({
  email: String,
  RentalUserDetails: {
    name: String,
    phoneNumber: String,
    vehicleType: String,
    parkingSpace: String,
  },
  ipDetails: {
    country: String,
    countryCode: String,
    region: String,
    regionName: String,
    city: String,
    zip: String,
    lat: Number,
    lon: Number,
    timezone: String,
  },
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      default: [0, 0]
    }
  },
}, {
  timestamps: true
});


RentalUserSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('RentalUser', RentalUserSchema);
