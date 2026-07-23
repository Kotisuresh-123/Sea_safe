import express from "express";
import User from "../models/User.js";
import Alert from "../models/Alert.js";
import SOS from "../models/SOS.js";
import SavedLocation from "../models/SavedLocation.js";
import WeatherHistory from "../models/WeatherHistory.js";
import { protect, adminOnly } from "../middleware/auth.js";
import { dbConnected } from "../config/db.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, async (req, res) => {
  if (!dbConnected) {
    return res.status(503).json({ success: false, message: "Database not connected" });
  }
  try {
    const [users, alerts, activeSOS, locations, weatherRecords] = await Promise.all([
      User.countDocuments(),
      Alert.countDocuments({ isActive: true }),
      SOS.countDocuments({ status: "active" }),
      SavedLocation.countDocuments(),
      WeatherHistory.countDocuments(),
    ]);

    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    const recentSOS = await SOS.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: { users, alerts, activeSOS, locations, weatherRecords },
      recentUsers,
      recentSOS,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/users", protect, adminOnly, async (req, res) => {
  if (!dbConnected) {
    return res.status(503).json({ success: false, message: "Database not connected" });
  }
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/users/:id/deactivate", protect, adminOnly, async (req, res) => {
  if (!dbConnected) {
    return res.status(503).json({ success: false, message: "Database not connected" });
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
