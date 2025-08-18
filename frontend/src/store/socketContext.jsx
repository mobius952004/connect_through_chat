import { createContext } from "react";
import { socket } from "../sockets/socket";
import { useState } from "react";

const ChatContext=createContext()



export default function ChatProvider({children}){

    const [userinfo,setuserinfo]=useState(false)
  const[sidepanel,setsidepanel]=useState("")


return (
    <ChatContext.Provider value={{socket,userinfo , setuserinfo ,sidepanel,setsidepanel} }>
      {children}
    </ChatContext.Provider>
)


}

export {ChatContext}