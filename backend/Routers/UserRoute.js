const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../Middleware/Authorization");
const { Check,SignIn, getUserProfile, updateUser,LogIn, GoogleAuthentication} = require('../Controller/UserControl');

router.get("/profile/:token",authenticateToken,getUserProfile);
router.put('/UpdateUser',updateUser);
router.post('/singin',SignIn)
router.post('/gsingin',SignIn)
router.get('/check',Check);
router.post('/login',LogIn)
module.exports = router;
