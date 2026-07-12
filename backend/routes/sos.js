import express from "express";
import SOS from "../models/SOS.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const optionalAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    } catch (err) {
      req.user = null;
    }
  }
  next();
};

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ success: false, message: "Admin access required" });
};

router.post("/", optionalAuth, async (req, res) => {
  try {
    const { latitude, longitude, message } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ success: false, message: "Location coordinates required" });
    }

    const sosData = {
      latitude,
      longitude,
      message: message || "SOS Emergency",
    };

    if (req.user) {
      sosData.user = req.user._id;
    }

    const sos = await SOS.create(sosData);

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
