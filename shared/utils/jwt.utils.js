// Centralised helpers for signing & verifying JWTs and hashing strings.
// Having ONE file avoids scattered secret strings and keeps rotation easy.
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Destructure env once – prevents reading undefined later.
const {
  JWT_ACCESS_SECRET,   // short‑lived – sign access JWT
  JWT_REFRESH_SECRET,  // long‑lived – sign refresh JWT
  ACCESS_EXPIRES_IN = "15m",
  REFRESH_EXPIRES_IN = "30d",
} = process.env;


console.log("[UTIL] ACCESS =", JWT_ACCESS_SECRET); 
class jwtServices{

  signAccessToken(user) {
  // sub (subject) → official JWT field: user ID.
  return jwt.sign({ sub: user._id.toString(), username: user.username }, JWT_ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
}

  signRefreshToken(user, deviceId) {
  return jwt.sign({ sub: user._id.toString(), deviceId }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}

  verifyAccess  = (token) => jwt.verify(token, JWT_ACCESS_SECRET);
  verifyRefresh = (token) => jwt.verify(token, JWT_REFRESH_SECRET);

// Helper: SHA‑256 one‑liner for refresh hash.
   sha256 = (str) => crypto.createHash("sha256").update(str).digest("hex");

// Helper: convert human string ("30d") to ms (uses tiny util below).
   toMs = (str) => {
  // Simple parser supporting s, m, h, d suffixes (90% use‑case)
  const match = /^(\d+)([smhd])$/.exec(str);
  if (!match) throw new Error("Invalid duration string " + str);
  const num = parseInt(match[1], 10);
  const unit = match[2];
  return num * { s: 1000, m: 60000, h: 3600000, d: 86400000 }[unit];
};


}

export default new jwtServices()