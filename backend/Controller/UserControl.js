require("dotenv").config;
const bcrypt = require("bcrypt");
const {UserDataModel,GoogleUserModel }= require("../Schema/Userschema.js");
const {hashPassword} = require("../Middleware/hashPassword")
const { generateToken } = require("../Middleware/Authentication.js");



const Check = (req, res) => {
  console.log("<h1>hELLO world</h1>");
  res.json({ hello: "hello" });
};

const SignIn = async (req, res) => {
  try {

    const { Username, PhoneNumber, Password } = req.body;
   
    const hashedPassword = await hashPassword(Password);
    const UserName = Username;
    let token;
    try {
      const existingUser = await UserDataModel.findOne({ name: UserName });
      if (existingUser) {

        return res.status(400).json({ error: "User already exists" });
      }
      const newUser = new UserDataModel({
        name: UserName,
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
  let { Username,password} = req.body;
  try {
   
    const user = await UserDataModel.findOne({ name: Username.toLowerCase()});

    if (!user) {
      return res.status(401).json({ error: "No username is found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(403).json({ error: "Incorrect password" });
    }

    const token = await generateToken(user);
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An error occurred during login" });
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
    const { GoogleUserData } = req.body;
    if (!GoogleUserData) {
      return res.status(400).json({ error: "No Google user data provided" });
    }
    const existingUser = await GoogleUserModel.findOne({ email: GoogleUserData.email });
    if (existingUser) {
      const updateFields = {
        ...existingUser,
        ...GoogleUserData,
        _id: existingUser._id 
      };
      await GoogleUserModel.findByIdAndUpdate(existingUser._id, { $set: updateFields }, { new: true });
      const token = await generateToken(existingUser);

      return res.status(200).json({ 
        message: "Google authentication successful",
        userData: existingUser,
        token
      });
    } else {
      const newgUser = new GoogleUserModel({
        ...GoogleUserData,
      });
      await newgUser.save();

      const token = await generateToken(newgUser);
      return res.status(200).json({ 
        message: "Google authentication successful",
        userData: GoogleUserData,
        token
      });
    }
  } catch (error) {
    console.error("Error during Google authentication:", error);
    res.status(500).json({ error: "An error occurred during Google authentication" });
  }
};

module.exports = { Check, SignIn , getUserProfile,  updateUser, LogIn,GoogleAuthentication };
