const rateLimit = require("express-rate-limit");

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: {
        message: "Too many requests. Please try again later."
    }
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    // windowMs: 30 * 1000,
    max: 20,
    message: {
        message: "Too many authentication attempts."
    }
});

const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 20,
    message: {
        message: "AI generation limit exceeded."
    }
});

module.exports = {
    globalLimiter,
    authLimiter,
    aiLimiter
};