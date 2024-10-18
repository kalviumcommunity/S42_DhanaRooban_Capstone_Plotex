const express = require('express');
const UserDataRoute = express.Router();
const { authenticateToken } = require("../Middleware/Authorization");
const {RentalPost,PostFindSpace, Nearby} = require('../Controller/UserDataControl')

UserDataRoute.post('/profile/RentalUserPost/token',authenticateToken,RentalPost);
UserDataRoute.post('/profile/FindSpace/:token',authenticateToken,PostFindSpace)
UserDataRoute.post('/nearby',Nearby);
module.exports = UserDataRoute;
