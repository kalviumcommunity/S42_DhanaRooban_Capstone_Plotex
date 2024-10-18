require('dotenv').config();
const RentalUser = require("../Schema/RentalUserSchema");
const FindSpaceUserData = require("../Schema/FindSpaceUserDataSchema");

const PostFindSpace = async (req, res) => {
  const Data = req.body;
  try { 
    const newUser = new FindSpaceUserData({
      location: Data.location,
      vehicleType: Data.vehicleType,
      MobileNumber: parseInt(Data.MobileNumber.replace(/\D/g, ''), 10),
      currentlocation: {
        lat: Data.Currentlocation.lat,
        lon: Data.Currentlocation.lon  
      }
    }); 
    await newUser.save();
    return res.status(200).json({ message: "User data saved successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error saving user data' });
  }
};

const RentalPost = async (req, res) => {
  try {
    const { modifiedData, ipDetails, center } = req.body;
    let existingUser = await RentalUser.findOne({ email: modifiedData.Email.toLowerCase() });
    if (existingUser) {
      const updateUser = await RentalUser.findByIdAndUpdate(
        existingUser._id,
        {
          $set: {
            RentalUserDetails: {
              ...existingUser.RentalUserDetails,
              name: modifiedData.Name,
              phoneNumber: modifiedData.PhoneNumber,
              vehicleType: modifiedData.VehicleType,
              parkingSpace: modifiedData.ParkingSpace,
            },
            ipDetails: {
              ...existingUser.ipDetails,
              country: ipDetails.country,
              countryCode: ipDetails.countryCode,
              region: ipDetails.region,
              regionName: ipDetails.regionName,
              city: ipDetails.city,
              zip: ipDetails.zip,
              lat: ipDetails.lat,
              lon: ipDetails.lon,
              timezone: ipDetails.timezone,
            },
            location: {
              type: 'Point',
              coordinates: [center.lon, center.lat] // [longitude, latitude]
            }
          }
        },
        { new: true }
      );
      return res.status(200).json({ message: "User data updated successfully", updateUser });
    } else {
      const newUser = new RentalUser({
        email: modifiedData.Email.toLowerCase(),
        RentalUserDetails: {
          name: modifiedData.Name,
          phoneNumber: modifiedData.PhoneNumber,
          vehicleType: modifiedData.VehicleType,
          parkingSpace: modifiedData.ParkingSpace,
        },
        ipDetails: {
          country: ipDetails.country,
          countryCode: ipDetails.countryCode,
          region: ipDetails.region,
          regionName: ipDetails.regionName,
          city: ipDetails.city,
          zip: ipDetails.zip,
          lat: ipDetails.lat,
          lon: ipDetails.lon,
          timezone: ipDetails.timezone,
        },
        location: {
          type: 'Point',
          coordinates: [center.lon, center.lat] // [longitude, latitude]
        }
      });
      const savedUser = await newUser.save();
      return res.status(201).json({ message: "New user created successfully", savedUser });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error creating/updating user' });
  }
};

const Nearby = async (req, res) => {
  try {
    const { lat, lon, maxDistance = 200 } = req.body;
console.log("d")
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
console.log(lat,lon)
 

    const nearbyLocations = await RentalUser.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 200 // Convert miles to meters
        }
      }
    });

    if (nearbyLocations.length === 0) {
      return res.status(404).json({ message: "No nearby locations found." });
    } else {
      return res.status(200).json({ nearbyLocations });
    }
  } catch (error) {
    console.error('Error fetching nearby locations:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { RentalPost, PostFindSpace, Nearby };
