  const jwt = require("jsonwebtoken");

  const authenticateToken = async (req, res, next) => {
    try {
      const token = req.query.token;
      if (!token) return res.sendStatus(401);
      const TokenData = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.TokenData = TokenData;
      return next();
    } catch (error) {
      console.log(error,"from token");
      res.sendStatus(403); 
    }
  };

  exports.authenticateToken = authenticateToken;
