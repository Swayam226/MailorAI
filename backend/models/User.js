const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    isVerified: {
        type: Boolean, default: false
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 12);
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            id: this._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );
};

const User = mongoose.model("User", userSchema);
module.exports = User;