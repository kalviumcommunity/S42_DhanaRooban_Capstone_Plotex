const express = require('express');
const UserDataRoute = express.Router();
const { authenticateToken } = require("../Middleware/Authorization");
const {Post,PostFindSpace} = require('../Controller/UserDataControl')

UserDataRoute.post('/profile/post/:token',authenticateToken,Post);
UserDataRoute.post('/profile/FindSpace/:token',authenticateToken,PostFindSpace)
module.exports = UserDataRoute;
