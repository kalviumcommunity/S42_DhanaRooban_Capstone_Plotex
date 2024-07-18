require("dotenv").config;
const UserData = require("../Schema/UserDataSchema");
const FindSpaceUserData = require("../Schema/FindSpaceUserDataSchema");

const PostFindSpace = async (req, res) => {
  try {
    const Data = req.body;
    const newUser = new FindSpaceUserData({
      location: Data.location,
      vehicleType: Data.vehicleType,
      parkingSpaceType: Data.parkingSpaceType,
    });
    await newUser.save();
    return res.status(200).json({ message: "User data saved successfully" });
  } catch (error) {
    console.log(error);
  }
};

const Post = async (req, res) => {
  try {
    const { modifiedData, ipData } = req.body;

    const existingUser = await UserData.findOne({ email: modifiedData.Email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = new UserData({
      name: modifiedData.Name,
      phoneNumber: modifiedData.PhoneNumber,
      email: modifiedData.Email,
      address: modifiedData.Location,
      vehicle: modifiedData.VehicleType,
      ParkingSpaceType: modifiedData.ParkingSpace,
      country: ipData.country,
      countryCode: ipData.countryCode,
      region: ipData.region,
      regionName: ipData.regionName,
      city: ipData.city,
      zip: ipData.zip,
      lat: ipData.lat,
      lon: ipData.lon,
      timezone: ipData.timezone,
    });
    await newUser.save();
    return res.status(200).json({ message: "User data saved successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { Post, PostFindSpace };
