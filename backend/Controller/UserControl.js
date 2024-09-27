require("dotenv").config;
const bcrypt = require("bcrypt");
const UserDataModel = require("../Schema/Userschema.js");
const {hashPassword} = require("../Middleware/hashPassword")
const { generateToken } = require("../Middleware/Authentication.js");



const Check = (req, res) => {
  console.log("<h1>hELLO world</h1>");
  res.json({ hello: "hello" });
};



const SignIn = async (req, res) => {
  try {

    const { Email, PhoneNumber, Password } = req.body;
    const hashedPassword = await hashPassword(Password);
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

const LogIn = async (req, res) => {
  let  { email, password}  = req.body;
//   console.log(modifiedData)
//  console.log(modifiedData.email)
  try {
    email = email.toLowerCase();
    const data = await UserDataModel.findOne({ email });
    if (!data) {
      return res.status(401).json({ error: "Cannot find your account" });
    }

    const match = await bcrypt.compare(password, data.password);
    if (!match) {
      return res.status(403).json({ error: "Incorrect password" });
    }

    const token = await generateToken(data);
    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An error occurred during login" });
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


module.exports = { Check, SignIn, getUserProfile, updateUser, LogIn,GoogleAuthentication };
