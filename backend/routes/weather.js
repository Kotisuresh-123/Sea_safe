import express from "express";
import WeatherHistory from "../models/WeatherHistory.js";
import { protect } from "../middleware/auth.js";
import { dbConnected } from "../config/db.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  if (!dbConnected) {
    return res.status(503).json({ success: false, message: "Database not connected" });
  }
  try {
    const { latitude, longitude, locationName, waveHeight, waveDirection, wavePeriod, windSpeed, temperature, riskLevel } = req.body;
    const record = await WeatherHistory.create({
      latitude,
      longitude,
      locationName,
      waveHeight,
      waveDirection,
      wavePeriod,
      windSpeed,
      temperature,
      riskLevel,
      fetchedBy: req.user._id,
    });
    res.status(201).json({ success: true, record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/", protect, async (req, res) => {
  if (!dbConnected) {
    return res.status(503).json({ success: false, message: "Database not connected" });
  }
  try {
    const { lat, lon, limit } = req.query;
    let query = {};
    if (lat && lon) {
      query.latitude = { $gte: parseFloat(lat) - 0.5, $lte: parseFloat(lat) + 0.5 };
      query.longitude = { $gte: parseFloat(lon) - 0.5, $lte: parseFloat(lon) + 0.5 };
    }
    const records = await WeatherHistory.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit) || 50);
    res.json({ success: true, count: records.length, records });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
