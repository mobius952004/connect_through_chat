export default function callSocket(io) {
  io.on("connection", (socket) => {
    socket.on("call:offer", ({ to, offer }) => {
      io.to(to).emit("call:incoming", { from: socket.id, offer });
    });

    socket.on("call:answer", ({ to, answer }) => {
      io.to(to).emit("call:accepted", { answer });
    });

    socket.on("call:ice-candidate", ({ to, candidate }) => {
      io.to(to).emit("call:ice-candidate", { candidate });
    });

    socket.on("call:end", ({ to }) => {
      io.to(to).emit("call:ended");
    });
  });
}
