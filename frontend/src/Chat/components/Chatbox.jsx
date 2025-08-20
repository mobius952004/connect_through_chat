import ChatAvatar from "./ChatAvatar";
import RightChatBubble from "./RightChatBubble";
import PrevChat from "./PrevChat";
import TextBox from "./TextBox";
import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../store/socketContext";
import { ChatEvents } from "../../sockets/chat.events";
import { SOCKET_EVENTS } from "../../../../middleware/socket.events";

export default function ChatBox() {

    const { socket, selecteduser } = useContext(ChatContext)

    const [textMessage, setTextMessage] = useState("")

    const [pastMessages, setPastMessages] = useState([]);

    const sendmessage = (Message) => {

        const newMessage = {
            text: Message,
            

            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            date: new Date().toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" }),
            belongstouser: true,
        };

        
        setPastMessages([newMessage, ...pastMessages]);

        socket.emit(ChatEvents.SEND_PRIVATE_MESSAGE,{
            toUserId: selecteduser?._id,
            newmessage: newMessage,
        })
    }

    useEffect(() => {
        if (!selecteduser) return;

        socket.emit(ChatEvents.JOIN_ROOM, { withUserId: selecteduser?._id });


        socket.on(ChatEvents.RECEIVE_MESSAGE, (recievedmessage) => {
            recievedmessage.belongstouser = false;
            setPastMessages(prev => [recievedmessage, ...prev]);
        });

        return () => {
            socket.off("recieved");
        }
    }, [socket ,selecteduser]);


    return (
        <div className=" flex-1 relative bg-gradient-to-t from-gray-900 to-gray-900 flex flex-col overflow-y-auto ">

            <ChatAvatar />
            <div className="bg-slate-600  relative  flex-1  flex flex-col-reverse overflow-y-scroll scrollbar-hide  ">

                {pastMessages.length === 0 ? (<p className="absolute bottom-0 text-gray-400 self-center-safe">No conversation yet</p>) : (
                    pastMessages.map((msg, key) => (
                        <PrevChat key={key} msg={msg} />
                    ))
                )}


            </div>
            <div className="">
                <TextBox textMessage={textMessage} setTextMessage={setTextMessage} sendmessage={sendmessage} />
            </div>
        </div>
    )
}