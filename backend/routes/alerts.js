import express from "express";
import Alert from "../models/Alert.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { lat, lon, radius } = req.query;
    let query = { isActive: true, expiresAt: { $gt: new Date() } };

    if (lat && lon) {
      const r = parseFloat(radius) || 100;
      query.latitude = { $gte: parseFloat(lat) - r / 111, $lte: parseFloat(lat) + r / 111 };
      query.longitude = { $gte: parseFloat(lon) - r / 111, $lte: parseFloat(lon) + r / 111 };
    }

    const alerts = await Alert.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: alerts.length, alerts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { title, message, severity, latitude, longitude, radius } = req.body;
    const alert = await Alert.create({
      title,
      message,
      severity,
      latitude,
      longitude,
      radius,
      createdBy: req.user._id,
    });
    res.status(201).json({ success: true, alert });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Alert.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: "Alert deactivated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
