const express = require("express");
const app = express();
const cors = require('cors');
const connectDB = require("./config/db")
const {
    globalLimiter,
    authLimiter,
    aiLimiter
} = require("./middleware/rateLimiters");
app.use(express.json());
require('dotenv').config()
app.use(cors());


const PORT = process.env.PORT || 3000;
connectDB();

const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(globalLimiter);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/ai", aiLimiter, aiRoutes);

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
