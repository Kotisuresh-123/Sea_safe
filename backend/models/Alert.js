import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Alert title is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Alert message is required"],
    },
    severity: {
      type: String,
      enum: ["info", "warning", "danger"],
      default: "info",
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    radius: {
      type: Number,
      default: 50,
      description: "Alert radius in km",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true }
);

AlertSchema.index({ latitude: 1, longitude: 1 });
AlertSchema.index({ isActive: 1, expiresAt: 1 });

export default mongoose.model("Alert", AlertSchema);
