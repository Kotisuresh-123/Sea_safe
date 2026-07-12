import mongoose from "mongoose";

const SOSSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      default: "SOS Emergency",
    },
    status: {
      type: String,
      enum: ["active", "responded", "resolved"],
      default: "active",
    },
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resolvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

SOSSchema.index({ status: 1 });
SOSSchema.index({ latitude: 1, longitude: 1 });

export default mongoose.model("SOS", SOSSchema);
