import express from "express";
import SavedLocation from "../models/SavedLocation.js";
import { protect } from "../middleware/auth.js";
import { dbConnected } from "../config/db.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  if (!dbConnected) {
    return res.status(503).json({ success: false, message: "Database not connected" });
  }
  try {
    console.log("GET /locations called");

    const locations = await SavedLocation.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    console.log("Sending response");

    return res.json({
      success: true,
      count: locations.length,
      locations,
    });
  } catch (err) {
    console.error("Locations error:", err);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
});

router.post("/", protect, async (req, res) => {
  if (!dbConnected) {
    return res.status(503).json({ success: false, message: "Database not connected" });
  }
  try {
    const { name, latitude, longitude, description, category } = req.body;
    const location = await SavedLocation.create({
      user: req.user._id,
      name,
      latitude,
      longitude,
      description,
      category,
    });
    res.status(201).json({ success: true, location });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  if (!dbConnected) {
    return res.status(503).json({ success: false, message: "Database not connected" });
  }
  try {
    const location = await SavedLocation.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!location) {
      return res.status(404).json({ success: false, message: "Location not found" });
    }
    res.json({ success: true, message: "Location deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
