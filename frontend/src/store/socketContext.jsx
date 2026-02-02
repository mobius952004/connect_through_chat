import { createContext } from "react";
import { socket } from "../sockets/socket";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ThermometerSnowflakeIcon } from "lucide-react";
const ChatContext = createContext();

export default function ChatProvider({ children }) {
  function getCurrentUser() {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    const decoded = jwtDecode(token);
    if(decoded.exp*1000<Date.now()) return null
    // console.log(decoded.username);

    return {
      userId: decoded.sub,
      username: decoded.username,
    };
  }

  const [userinfo, setuserinfo] = useState(false);
  const [sidepanel, setsidepanel] = useState("");
  const [selecteduser, setselecteduser] = useState(null);
  const [chatlist, setchatlist] = useState([]);
    const [selectedChat,setSelectedChat]=useState(null)
  return (
    <ChatContext.Provider
      value={{
        socket,
        userinfo,
        setuserinfo,
        sidepanel,
        setsidepanel,
        selecteduser,
        setselecteduser,
        getCurrentUser,
        chatlist,
        setchatlist,
        selectedChat,
        setSelectedChat
        
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export { ChatContext };
