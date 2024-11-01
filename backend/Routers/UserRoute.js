const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../Middleware/Authorization");
const { Check, SignIn, getUserProfile, updateUser, LogIn, GoogleAuthentication } = require('../Controller/UserControl');
const apiLimiter = require('../Middleware/RateLimiter');

router.get("/profile/:token", authenticateToken, getUserProfile);
router.put('/UpdateUser', updateUser);
router.post('/singin', apiLimiter, SignIn);
router.post('/gsign',GoogleAuthentication);
router.get('/check', apiLimiter, Check);
router.post('/login', apiLimiter, LogIn);

module.exports = router;