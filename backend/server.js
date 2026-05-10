const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
