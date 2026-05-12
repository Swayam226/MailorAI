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