import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ["available", "unavailable"], default: "available" },
});

export default mongoose.model("Slot", SlotSchema);
