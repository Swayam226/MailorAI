exports.registerUser = (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: "all fields are required." })
        }
        res.send("user registered");
    } catch (error) {
        console.error(error);
    }
}