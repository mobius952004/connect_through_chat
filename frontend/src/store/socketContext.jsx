import { createContext } from "react";
import { socket } from "../sockets/socket";
const ChatContext=createContext()



export default function ChatProvider({children}){


return (
    <ChatContext.Provider value={socket}>
      {children}
    </ChatContext.Provider>
)


}