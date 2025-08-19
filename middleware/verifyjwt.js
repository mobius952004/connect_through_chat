
import jwtServices from "../shared/utils/jwt.utils.js";

const verifyToken = (req, res, next) => {
  const authHeader = req.get("Authorization"); // case-insensitive

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access token missing or malformed" });
  }

  const token = authHeader.split(" ")[1]; // extract the token part

  try {
    const payload = jwtServices.verifyAccess(token); // your util method
    req.user = payload; // attach decoded token to request
    next(); 
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;
