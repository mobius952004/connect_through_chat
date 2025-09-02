import { createContext } from "react";
import { socket } from "../sockets/socket";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ThermometerSnowflakeIcon } from "lucide-react";
const ChatContext = createContext()



export default function ChatProvider({ children }) {


function getCurrentUserId() {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  const decoded = jwtDecode(token);
  return decoded.sub; 
}

  const [userinfo, setuserinfo] = useState(false)
  const [sidepanel, setsidepanel] = useState("")
  const [selecteduser, setselecteduser] = useState(null)



  return (
    <ChatContext.Provider value={{ socket, userinfo, setuserinfo, sidepanel, setsidepanel, selecteduser, setselecteduser,getCurrentUserId }}>
      {children}
    </ChatContext.Provider>
  )


}

export { ChatContext }