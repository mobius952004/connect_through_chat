import io from "socket.io-client";

const SOCKET_URL=import.meta.env.VITE_SOCKET_URL
export const socket=io(SOCKET_URL,
    (
    {
        auth:{
            accessToken:localStorage.getItem("accessToken")
        }
    }
)
)

export const connectSocket = () => {
  socket.auth = { accessToken: localStorage.getItem("accessToken") };
  socket.connect();
};