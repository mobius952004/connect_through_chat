import 'dotenv/config';

import http from "http";
import app from "./app.js";
import {Server} from "socket.io"
import registerSocketHandeler from "./sockets/index.js"


const PORT = process.env.PORT || 3000;

// Create server
const server = http.createServer(app);



const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  // ✅ Only allow your React app
    methods: ["GET", "POST"],
    credentials: true
  }
});

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

registerSocketHandeler(io)


server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
