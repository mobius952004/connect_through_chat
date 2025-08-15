import ChatAvatar from "./ChatAvatar"
import RightChatBubble from "./RightChatBubble"
import ChatBubble from "./LeftChatBubble"
import TextBox from "./TextBox"
import { useContext,useState } from "react"
import { ChatContext } from "../../store/socketContext"

export default function ChatBox() {

    const socket=useContext(ChatContext)
    socket.emit("first_chat",)

    const [textMessage, setTextMessage] = useState("")

    return (
        <div className=" flex-1 relative bg-gradient-to-t from-gray-900 to-gray-900 flex flex-col overflow-y-auto ">

            <ChatAvatar />
            <div className="bg-slate-600   flex-1  flex flex-col-reverse overflow-y-scroll scrollbar-hide  ">

                <RightChatBubble />
                <ChatBubble />
                <ChatBubble />
                <ChatBubble />
                {/* text box */}
            </div>
            <div className="">
                <TextBox  textMessage={textMessage} setTextMessage={setTextMessage}/>
            </div>
        </div>

    )
}