

// import jwtServices from "../shared/utils/jwt.utils.js"; // Adjust path based on your folder

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers["Authorization"];
//   const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
// console.log("[MIDDLEWARE] Headers received:", req.headers);

//   if (!token) return res.status(401).json({ message: "Access token missing" });

//   try {
//     const payload = jwtServices.verifyAccess(token);  
//     req.user = payload;  // { sub: userId, username: "..." }
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid or expired access token" });
//   }
// };

// export default verifyToken
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
