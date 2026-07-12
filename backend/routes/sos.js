import express from "express";
import SOS from "../models/SOS.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { latitude, longitude, message } = req.body;
    const sos = await SOS.create({
      user: req.user._id,
      latitude,
      longitude,
      message,
    });

    const populated = await SOS.findById(sos._id).populate("user", "name email phone");

    if (req.app.get("io")) {
      req.app.get("io").emit("sos-alert", populated);
    }

    res.status(201).json({ success: true, sos: populated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const sosList = await SOS.find()
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });
    res.json({ success: true, count: sosList.length, sos: sosList });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/active", protect, async (req, res) => {
  try {
    const active = await SOS.find({ status: "active" })
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });
    res.json({ success: true, count: active.length, sos: active });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/:id/respond", protect, adminOnly, async (req, res) => {
  try {
    const sos = await SOS.findByIdAndUpdate(
      req.params.id,
      { status: "responded", respondedBy: req.user._id },
      { new: true }
    ).populate("user", "name email phone");
    res.json({ success: true, sos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/:id/resolve", protect, adminOnly, async (req, res) => {
  try {
    const sos = await SOS.findByIdAndUpdate(
      req.params.id,
      { status: "resolved", resolvedAt: new Date() },
      { new: true }
    ).populate("user", "name email phone");
    res.json({ success: true, sos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
