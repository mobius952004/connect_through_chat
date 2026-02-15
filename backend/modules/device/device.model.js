import mongoose from "mongoose";
const deviceSchema = new mongoose.Schema(
  {
    userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    deviceId: { type: String, required: true }, // uuid v4

    // We store *SHA‑256* of the refresh token, NOT the token itself –
    // because refresh tokens last 30+ days and we don't want raw
    // secrets sitting in the DB.
    refreshHash: { type: String, required: true },

    expiresAt: { type: Date, required: true },   // 👉 TTL for auto‑cleanup

    agent:   { type: String },                   // Optional: "Pixel 7 / Android 14"
    lastSeen:{ type: Date, default: Date.now },  // Updated on each refresh
  },
  { timestamps: true }
);

// MongoDB TTL index – docs auto‑expire when expiresAt < now.
deviceSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

  const Device = mongoose.model("Device", deviceSchema);

  export default Device