import io from "socket.io-client";

const SOCKET_URL=import.meta.env.VITE_SOCKET_URL
export const socket=io(SOCKET_URL, (
    {
        autoConnect: false,
        auth:{
            accessToken:localStorage.getItem("accessToken")
        }
    }
)
)

export const connectSocket = () => {
if (socket.connected) return
  socket.auth = { accessToken: localStorage.getItem("accessToken") };
  socket.connect();
};