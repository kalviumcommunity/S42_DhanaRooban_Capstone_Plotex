const jwt = require("jsonwebtoken");

const generateToken = async (NewUser) => {
  try {
    let token = await jwt.sign(
      {
        email: NewUser.email,
        id: NewUser.id
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "31d" }
    );
    return token;
  } catch (error) {
    throw new Error("Error generating token");
  }
};

module.exports = { generateToken };

