import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./modules/authentication/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import chatRouter from "./modules/chat/chat.routes.js";
import messageRouter from "./modules/message/message.routes.js";
import cookieParser from "cookie-parser"

console.log("ACCESS:", process.env.JWT_ACCESS_SECRET?.slice(0, 10));
console.log("REFRESH:", process.env.JWT_REFRESH_SECRET?.slice(0, 10));

const app = express();

connectDB();

app.use(
  cors({
   origin: [
      "http://localhost:5173",

      "http://10.185.141.186:5173" ,

    ],
    credentials:true,
  })
);

// JSON parsing
app.use(express.json());
app.use(cookieParser())

// Routes
app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/chat/", chatRouter);
app.use("/api/messages/", messageRouter);

app.get("/", (req, res) => {
  res.send({ msg: "hlo" });
});

export default app;
