import ChatAvatar from "./ChatAvatar";
import RightChatBubble from "./RightChatBubble";
import PrevChat from "./PrevChat";
import TextBox from "./TextBox";
import { useContext, useState } from "react";
import { ChatContext } from "../../store/socketContext";

export default function ChatBox() {

    const socket = useContext(ChatContext)
    socket.emit("first_chat",)

    const [textMessage, setTextMessage] = useState("")

    const [pastMessages, setPastMessages] = useState([]);

    const sendmessage = (Message) => {

            const newMessage = {
        text: Message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        date: new Date().toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" })
    };

        setPastMessages([newMessage, ...pastMessages]);

        console.log(pastMessages)
    }

    return (
        <div className=" flex-1 relative bg-gradient-to-t from-gray-900 to-gray-900 flex flex-col overflow-y-auto ">

            <ChatAvatar />
            <div className="bg-slate-600  relative  flex-1  flex flex-col-reverse overflow-y-scroll scrollbar-hide  ">

                {pastMessages.length === 0 ? (<p className="absolute bottom-0 left-120 text-gray-400">No conversation yet</p>) : (
                    pastMessages.map((msg, key) => (
                        <PrevChat key={key} msg={msg} />
                    ))  
                )}
                {/* <RightChatBubble /> */}
                {/* <PrevChat pastMessaage={pastMessage}/> */}
                {/* text box */}
            </div>
            <div className="">
                <TextBox textMessage={textMessage} setTextMessage={setTextMessage} sendmessage={sendmessage} />
            </div>
        </div>

    )
}