import { createContext } from "react";
import { socket } from "../sockets/socket";
import { useState } from "react";
// import {jwtServices} from "../../../shared/utils/jwt.utils.js"

const ChatContext = createContext()



export default function ChatProvider({ children }) {

  // const accessToken= localStorage.getItem("accessToken")

  // const payload=jwtServices.verifyAccess(accessToken)
  // const userID =payload._id

  const [userinfo, setuserinfo] = useState(false)
  const [sidepanel, setsidepanel] = useState("")
  const [selecteduser, setselecteduser] = useState(null)


  return (
    <ChatContext.Provider value={{ socket, userinfo, setuserinfo, sidepanel, setsidepanel, selecteduser, setselecteduser }}>
      {children}
    </ChatContext.Provider>
  )


}

export { ChatContext }