require("dotenv").config;
const bcrypt = require("bcrypt");
const UserDataModel = require("../Schema/Userschema.js");
const {hashPassword} = require("../Middleware/hashPassword")
const { generateToken } = require("../Middleware/Authentication.js");



const Check = (req, res) => {
  console.log("<h1>hELLO world</h1>");
  res.json({ hello: hello });
};



const SignIn = async (req, res) => {
  try {
  
    const { Email, PhoneNumber, Password } = req.body;
    const hashedPassword = await hashPassword(Password)
    const userEmail = Email;
    let token;
    try {
      const existingUser = await UserDataModel.findOne({ email: userEmail });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      const newUser = new UserDataModel({
        email: userEmail,
        phoneNumber: PhoneNumber,
        password: hashedPassword,
      });
      await newUser.save();
      const token = await generateToken(newUser);
      res.status(200).json({ message: "Successfully signed in", token });
    } catch (error) {
      console.error("Error saving new user:", error); 
      return res.status(500).json({ message: "An error occurred during token generation" });
    }

  } catch (error) {
    console.error("Error during sign-in:", error); 
    res.status(500).json({ message: "An error occurred during sign-in" });
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
module.exports = { Check, SignIn, getUserProfile, updateUser, LogIn };
