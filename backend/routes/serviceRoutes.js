const express = require("express");
const Service = require("../models/Service");
const router = express.Router();

// Create a new service for the logged-in user using their email
router.post("/", async (req, res) => {
  try {
    const { name, image, description, pricing, email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required!" });
    }

    const newService = new Service({ name, image, description, pricing, email });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error("🔥 Error adding service:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get all services for a specific user based on email
router.get("/", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required!" });
    }

    const services = await Service.find({ email });
    res.json(services);
  } catch (error) {
    console.error("🔥 Error fetching services:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
