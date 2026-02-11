import ChatAvatar from "./ChatAvatar";
// import RightChatBubble from "./RightChatBubble";
import PrevChat from "./PrevChat";
import TextBox from "./TextBox";
import { useContext, useEffect } from "react";
import { ChatContext } from "../../store/socketContext";
import { ChatEvents } from "../../sockets/chat.events";
import { getMessages } from "../../api/auth";

export default function ChatBox() {
    const { socket, selectedChat, getCurrentUser, markChatAsRead,
        textMessage, setTextMessage, pastMessages, setPastMessages, 
    } = useContext(ChatContext);
    // const [textMessage, setTextMessage] = useState("");
    // const [pastMessages, setPastMessages] = useState([]);

    //getting the current userif form the help of belo function which is using jwt-decode
    const UserId = getCurrentUser().userId;
    const username = getCurrentUser().username
    // console.log(username)
    const otheruser = selectedChat?.users.find(u => u._id !== UserId);

    //creating unique roomid for one on one chat consistion of ids of both the users
    const getRoomId = ({ userId, withUserId }) => {
        return [userId, withUserId].sort().join("_");
    };
    // message coming from textbox
    const sendmessage = (Message, replyMessage) => {
        // const roomId = getRoomId({ userId: UserId, withUserId: selecteduser });
        const roomId = getRoomId({ userId: UserId, withUserId: otheruser._id });
        console.log(replyMessage)
        const newMessage = {
            content: Message,
            to: otheruser._id,
            from: UserId,
            fromName: username,
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
            replyTo: replyMessage
                ? replyMessage._id
                : null,
            isForward:false,
        };

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

        // Mark as read immediately when opening/viewing
        markChatAsRead(selectedChat._id);

        // const accessToken = localStorage.getItem("accessToken")
        const messages = async () => {

            const allMessages = await getMessages(selectedChat._id)
            const transformed = allMessages.map(msg => ({
                ...msg,
                belongstouser: msg.from._id === UserId
            }));

            setPastMessages(transformed);
            // setPastMessages(prev => [...prev, transformed]);

            // FIX: Mark existing unread messages as read
            transformed.forEach(msg => {
                if (msg.to === UserId && msg.status !== "Read") {
                    socket.emit("MESSAGE_READ", { messageId: msg._id });
                }
            });

        }
        messages()


        // Initial Join
        if (socket.connected) {
            socket.emit(ChatEvents.JOIN_ROOM, { withUserId: otheruser?._id });
        }

        // Handle Reconnection
        const handleConnect = () => {
            console.log("Socket connected, joining room...");
            socket.emit(ChatEvents.JOIN_ROOM, { withUserId: otheruser?._id });
        };

        socket.on("connect", handleConnect);


        // for selected chat

        const handleReceiveMessage = async (recievedmessage) => {

            if (recievedmessage.Chat !== selectedChat._id) return;
            // Additional check: If global listener handles it, do we need this? 
            // Yes, because this is for the LIVE view. Global handles background counts.

            //for a single message
            if (
                recievedmessage.to == UserId &&
                recievedmessage.status != "Read"
            ) {
                socket.emit("MESSAGE_READ", { messageId: recievedmessage._id });
            }

            recievedmessage.belongstouser = recievedmessage.from === UserId;

            setPastMessages((prev) => [recievedmessage, ...prev]);

        };

        socket.on(ChatEvents.RECEIVE_MESSAGE, handleReceiveMessage);

        const handleMessageUpdated = (updatedMsg) => {
            setPastMessages((prev) =>
                prev.map((m) => (m._id === updatedMsg._id ? updatedMsg : m))
            );
        };

        socket.on("MESSAGE_UPDATED", handleMessageUpdated);

        return () => {
            socket.off("connect", handleConnect);
            socket.off(ChatEvents.RECEIVE_MESSAGE, handleReceiveMessage);
            socket.off("MESSAGE_UPDATED", handleMessageUpdated);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, selectedChat, UserId,]);

    return (
        <div className=" flex-1 relative  bg-gradient-to-l  from-gray-900 via-gray-600 to-gray-200 flex flex-col overflow-y-auto ">
            
            <ChatAvatar UserId={UserId} />
 
            
           
            <div className="dark:bg-gray-900  relative  flex-1  flex flex-col-reverse overflow-y-scroll scrollbar-hide bg-graay-800 ">
                
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
