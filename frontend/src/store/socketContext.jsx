import { createContext } from "react";
import { socket } from "../sockets/socket";
import { useState } from "react";

const ChatContext=createContext()



export default function ChatProvider({children}){

    const [userinfo,setuserinfo]=useState(false)



return (
    <ChatContext.Provider value={{socket,userinfo , setuserinfo} }>
      {children}
    </ChatContext.Provider>
)


}

export {ChatContext}