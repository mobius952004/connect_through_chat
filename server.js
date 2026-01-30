import 'dotenv/config';

import http from "http";
import app from "./app.js";
import {Server} from "socket.io"
import registerSocketHandeler from "./sockets/index.js"


const PORT = process.env.PORT || 3000;

// Create server
const server = http.createServer(app);



const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
  origin: [
      "http://localhost:5173",
      "http://172.21.161.186:5173",
      "http://192.168.1.10:5173",
      "http://10.209.88.186:5173",
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});


registerSocketHandeler(io)


server.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
