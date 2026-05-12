const User = require("../models/User");
const sendEmail = require("../utils/sendEmail")

exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: "all fields are required." })
        }

        if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return res.status(400).json({ message: 'Please provide a valid email address' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        if (username.length < 2) {
            return res.status(400).json({ message: 'userame must be at least 2 characters long' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" })
        }

        const otp = Math.floor(10000 + Math.random() * 90000).toString();

        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const user = await User.create({ username, password, email, otp, otpExpiry })
        res.status(201).json({ message: "user registered" });

        try {
            await sendEmail({
                to: email,
                subject: 'Your OTP for MailorAI',
                text: `Your OTP code is ${otp}. Valid for 10 minutes.`
            });
        } catch (error) {
            console.log({ message: "Error sending OTP", error: error.message })
        }


    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        if (!/^\d{5}$/.test(otp)) {
            return res.status(400).json({ message: 'OTP must be a 5-digit number' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified. Please login.' });
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({ message: 'No OTP found. Please register again.' });
        }

        if (Date.now() > user.otpExpiry.getTime()) {
            return res.status(400).json({ message: 'OTP has expired. Please register again.' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({
            message: 'Email verified successfully!'
        });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: 'Verification failed', error: error.message });
    }
};
