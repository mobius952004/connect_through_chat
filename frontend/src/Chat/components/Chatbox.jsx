import ChatAvatar from "./ChatAvatar";
// import RightChatBubble from "./RightChatBubble";
import PrevChat from "./PrevChat";
import TextBox from "./TextBox";
import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../store/socketContext";
import { ChatEvents } from "../../sockets/chat.events";
import { User } from "lucide-react";

export default function ChatBox() {
    const { socket, selecteduser, getCurrentUser } = useContext(ChatContext);

    const [textMessage, setTextMessage] = useState("");

    const [pastMessages, setPastMessages] = useState([]);

    //getting the current userif form the help of belo function which is using jwt-decode
    const UserId = getCurrentUser().userId;
    const username = getCurrentUser().username
    // console.log(username)

    //creating unique roomid for one on one chat consistion of ids of both the users
    const getRoomId = ({ userId, withUserId }) => {
        return [userId, withUserId].sort().join("_");
    };
    // message coming from textbox
    const sendmessage = (Message) => {
        const roomId = getRoomId({ userId: UserId, withUserId: selecteduser });

        const newMessage = {
            content: Message,
            to: selecteduser,
            from: UserId,
            roomId,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            date: new Date().toLocaleDateString([], {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }),
            belongstouser: true,
            status: "Pending",
            username,
        };

        // message sent directly to ui
        // setPastMessages(prev => [newMessage, ...prev]);

        // message emmited
        socket.emit(
            ChatEvents.SEND_PRIVATE_MESSAGE,
            {
                toUserId: selecteduser?._id,
                newmessage: newMessage,
            },
            (response) => {
                console.log(response.status);
            }
        );
    };

    useEffect(() => {
        if (!selecteduser) return;

        //whenever selected user changes  import the messsages sonsisting the chat id /roomid ,
        //use chat id as it represent the connection between users itself 

        socket.emit(ChatEvents.JOIN_ROOM, { withUserId: selecteduser?._id });

        //can we the to user ie selected usaer to check

        socket.on(ChatEvents.RECEIVE_MESSAGE, async (recievedmessage) => {
            //   recievedmessage.map(msg => {
            //         if (msg.to === UserId && msg.status !== "read") {
            //             socket.emit("MESSAGE_READ", { messageId: msg._id });
            //         }
            //     });

            //for a single message
            if (
                recievedmessage.to == UserId &&
                recievedmessage.status != "Read"
            ) {
                socket.emit("MESSAGE_READ", { messageId: recievedmessage._id });
            }

            recievedmessage.from === UserId
                ? (recievedmessage.belongstouser = true)
                : (recievedmessage.belongstouser = false);

            setPastMessages((prev) => [recievedmessage, ...prev]);
        });
        socket.on("MESSAGE_UPDATED", (updatedMsg) => {
            setPastMessages((prev) =>
                prev.map((m) => (m._id === updatedMsg._id ? updatedMsg : m))
            );
        });

        return () => {
            socket.off(ChatEvents.RECEIVE_MESSAGE);
            socket.off("MESSAGE_UPDATED");
        };
    }, [socket, selecteduser, UserId]);

    return (
        <div className=" flex-1 relative  bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 flex flex-col overflow-y-auto ">
            <ChatAvatar />
            <div className="dark:bg-gray-800  relative  flex-1  flex flex-col-reverse overflow-y-scroll scrollbar-hide bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900  ">
                {pastMessages.length === 0 ? (
                    <p className="absolute bottom-0 text-gray-300 self-center-safe">
                        No conversation yet
                    </p>
                ) : (
                    pastMessages.map((msg, key) => <PrevChat key={key} msg={msg} />)
                )}
            </div>
            <div className="">
                <TextBox
                    textMessage={textMessage}
                    setTextMessage={setTextMessage}
                    sendmessage={sendmessage}
                />
            </div>
        </div>
    );
}
