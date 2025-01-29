const express = require("express");
const cors = require("cors");
const mongoose = require("./db"); // Ensure MongoDB is connected
const User = require("./models/User"); // Import the Mongoose model

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists!" });
    }

    const newUser = new User({ name, email, message });
    await newUser.save();

    res.status(201).json({ success: true, message: "User data saved successfully!" });
  } catch (error) {
    console.error("❌ Error saving user data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
