require("dotenv").config;
const bcrypt = require("bcrypt");
const UserDataModel = require("../Schema/Userschema.js");
const {hashPassword} = require("../Middleware/hashPassword")
const { generateToken } = require("../Middleware/Authentication.js");



const Check = (req, res) => {
  console.log("<h1>hELLO world</h1>");
  res.json({ hello: "hello" });
};



const updateUser = async (req, res) => {
  try {
    const { name, email, PhoneNumber } = req.body;
    const UserProfile = await userDataModel.findOneAndUpdate({
      email: email,
      name: name,
      number: number,
    });
    res
      .status(UserProfile ? 200 : 404)
      .send(UserProfile || "Profile not updated.");
  } catch (error) {
    console.log("error");
  }

};




const getUserProfile = async (req, res) => {
  try {

    if (!req.TokenData) {
      return res.status(401).json({ message: "Authentication required.Please log in" });
    }
    var data = req.TokenData;
    const FilterData = await UserDataModel.findOne({email: data.email});
    res.json({FilterData});

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const GoogleAuthentication = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { GoogleUserData } = req.body;
    console.log(GoogleUserData);

    if (!GoogleUserData) {
      return res.status(400).json({ error: "No Google user data provided" });
    }

    // Process the Google user data here
    // Example: Store the user data in the database or perform any necessary operations

    res.status(200).json({ message: "Google authentication successful", userData: GoogleUserData });
  } catch (error) {
    console.error("Error during Google authentication:", error);
    res.status(500).json({ error: "An error occurred during Google authentication" });
  }
};


module.exports = { Check, SignIn , getUserProfile,  updateUser, LogIn,GoogleAuthentication };
