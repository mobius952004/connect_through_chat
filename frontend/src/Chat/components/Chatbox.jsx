import ChatAvatar from "./ChatAvatar";
// import RightChatBubble from "./RightChatBubble";
import PrevChat from "./PrevChat";
import TextBox from "./TextBox";
import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../store/socketContext";
import { ChatEvents } from "../../sockets/chat.events";
import { User } from "lucide-react";
import { getMessages } from "../../api/auth";

export default function ChatBox() {
    const { socket, selectedChat, getCurrentUser } = useContext(ChatContext);
    const [textMessage, setTextMessage] = useState("");
    const [pastMessages, setPastMessages] = useState([]);

    //getting the current userif form the help of belo function which is using jwt-decode
    const UserId = getCurrentUser().userId;
    const username = getCurrentUser().username
    // console.log(username)
    const otheruser = selectedChat?.users.find(u => u._id !== UserId);
    console.log(otheruser)
    //creating unique roomid for one on one chat consistion of ids of both the users
    const getRoomId = ({ userId, withUserId }) => {
        return [userId, withUserId].sort().join("_");
    };
    // message coming from textbox
    const sendmessage = (Message) => {
        // const roomId = getRoomId({ userId: UserId, withUserId: selecteduser });
        const roomId = getRoomId({ userId: UserId, withUserId: otheruser._id });

        const newMessage = {
            content: Message,
            to: otheruser._id,
            from: UserId,
            roomId,
            Chat: selectedChat._id,
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
                // toUserId: selecteduser?._id,
                toUserId: otheruser?._id,
                // Chat:selectedChat._id,
                newmessage: newMessage,
            },
            (response) => {
                console.log(response.status);
            }
        );
    };

    useEffect(() => {
        // if (!selecteduser) return;
        if (!otheruser) return;

        const accessToken = localStorage.getItem("accessToken")
        const messages = async () => {

            const allMessages = await getMessages(accessToken, selectedChat._id)
            const transformed = allMessages.map(msg => ({
                ...msg,
                belongstouser: msg.from._id === UserId
            }));

            setPastMessages(transformed);
        }
        messages()

        //whenever selected user changes  import the messsages sonsisting the chat id /roomid ,
        //use chat id as it represent the connection between users itself 

        // for selected user
        // socket.emit(ChatEvents.JOIN_ROOM, { withUserId: selecteduser?._id });

        // for selected chat
        socket.emit(ChatEvents.JOIN_ROOM, { withUserId: otheruser?._id });

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

            // recievedmessage.from === UserId
            //     ? (recievedmessage.belongstouser = true)
            //     : (recievedmessage.belongstouser = false);
              recievedmessage.belongstouser = recievedmessage.from === UserId;

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, selectedChat, UserId,]);

    return (
        <div className=" flex-1 relative  bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 flex flex-col overflow-y-auto ">
            <ChatAvatar UserId={UserId} />
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
