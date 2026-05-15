const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController")
const rateLimit = require("express-rate-limit")

const otpLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: {
        message: "Too many OTP requests."
    }
});

router.post('/register', otpLimiter, authController.register);

router.post('/login', authController.login);

router.post('/verify-otp', authController.verifyOtp);

module.exports = router;
