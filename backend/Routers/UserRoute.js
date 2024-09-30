const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../Middleware/Authorization");
const { Check,SignIn, getUserProfile, updateUser,LogIn, GoogleAuthentication} = require('../Controller/UserControl');
import apiLimiter from '../Middleware/RateLimiter';

router.get("/profile/:token",authenticateToken,getUserProfile);
router.put('/UpdateUser',updateUser);

router.post('/sign',apiLimiter,SignIn)
router.post('/singin',apiLimiter, SignIn)
router.post('/gsingin',apiLimiter ,SignIn)
router.get('/check',apiLimiter, Check);
router.post('/login',apiLimiter,LogIn)
module.exports = router;
