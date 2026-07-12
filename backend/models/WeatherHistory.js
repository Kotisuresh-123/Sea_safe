import mongoose from "mongoose";

const WeatherHistorySchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    locationName: {
      type: String,
      default: "",
    },
    waveHeight: {
      type: Number,
      default: 0,
    },
    waveDirection: {
      type: Number,
      default: 0,
    },
    wavePeriod: {
      type: Number,
      default: 0,
    },
    windSpeed: {
      type: Number,
      default: 0,
    },
    temperature: {
      type: Number,
      default: 0,
    },
    riskLevel: {
      type: String,
      enum: ["safe", "caution", "danger"],
      default: "safe",
    },
    fetchedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

WeatherHistorySchema.index({ latitude: 1, longitude: 1, createdAt: -1 });

export default mongoose.model("WeatherHistory", WeatherHistorySchema);
