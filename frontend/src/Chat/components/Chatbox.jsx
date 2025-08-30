import ChatAvatar from "./ChatAvatar";
// import RightChatBubble from "./RightChatBubble";
import PrevChat from "./PrevChat";
import TextBox from "./TextBox";
import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../store/socketContext";
import { ChatEvents } from "../../sockets/chat.events";


export default function ChatBox() {


    const { socket, selecteduser } = useContext(ChatContext)

    const [textMessage, setTextMessage] = useState("")

    const [pastMessages, setPastMessages] = useState([]);

    // message coming from textbox 
    const sendmessage = (Message) => {

        const newMessage = {
            text: Message,
            tempid: Date.now().toString(),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            date: new Date().toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" }),
            belongstouser: true,
        };

// message sent directly to ui
        setPastMessages([newMessage, ...pastMessages]);

        // message emmited
        socket.emit(ChatEvents.SEND_PRIVATE_MESSAGE, {
            toUserId: selecteduser?._id,
            newmessage: newMessage,
        })
    }

    useEffect(() => {
        if (!selecteduser) return;

        socket.emit(ChatEvents.JOIN_ROOM, { withUserId: selecteduser?._id });

        // socket.on("UserMessage",(msg)=>{
        //     setPastMessages([msg, ...pastMessages])
        // })

        //can we the to user ie selected usaer to check
        socket.on(ChatEvents.RECEIVE_MESSAGE, (recievedmessage) => {
            recievedmessage.belongstouser = false;
            setPastMessages(prev => [recievedmessage, ...prev]);
        });

        return () => {
            socket.off(ChatEvents.RECEIVE_MESSAGE);
        }
    }, [socket, selecteduser]);


    return (
        <div className=" flex-1 relative  bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 flex flex-col overflow-y-auto ">

            <ChatAvatar />
            <div className="dark:bg-gray-800  relative  flex-1  flex flex-col-reverse overflow-y-scroll scrollbar-hide bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900  ">

                {pastMessages.length === 0 ? (<p className="absolute bottom-0 text-gray-300 self-center-safe">No conversation yet</p>) : (
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