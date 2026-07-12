import mongoose from "mongoose";

const SavedLocationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Location name is required"],
      trim: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["port", "harbor", "fishing", "emergency", "other"],
      default: "other",
    },
  },
  { timestamps: true }
);

SavedLocationSchema.index({ user: 1 });

export default mongoose.model("SavedLocation", SavedLocationSchema);
