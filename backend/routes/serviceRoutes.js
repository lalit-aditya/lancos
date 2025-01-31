const express = require("express");
const router = express.Router();
const Service = require("../models/Service"); // ✅ Corrected path

// Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Error fetching services" });
  }
});

// Add a new service
router.post("/", async (req, res) => {
  try {
    const { name, image, description, pricing } = req.body;

    if (!name || !image || !description || !pricing) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newService = new Service({ name, image, description, pricing });
    await newService.save();

    res.status(201).json(newService);
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ message: "Error adding service" });
  }
});

// Delete a service
router.delete("/:id", async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found!" });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Error deleting service" });
  }
});

module.exports = router; // ✅ Corrected export
