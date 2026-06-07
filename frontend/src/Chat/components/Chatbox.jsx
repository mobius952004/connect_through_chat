import ChatAvatar from "./ChatAvatar";

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


    const UserId = getCurrentUser().userId;
    const username = getCurrentUser().username
    // console.log(username)
    const otheruser = selectedChat?.users.find(u => u._id !== UserId);

    // message coming from textbox
    const sendmessage = (Message, replyMessage) => {
        const roomId = selectedChat._id;
        console.log(replyMessage)
        const newMessage = {
            content: Message,
            to: otheruser?._id, // Can be undefined for groups, handled by backend
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
            isForward: false,
        };

        // message emmited
        socket.emit(
            ChatEvents.SEND_PRIVATE_MESSAGE,
            {
                newmessage: newMessage,
            },
            (response) => {
                console.log(response.status);
            }
        );
    };

    useEffect(() => {
        if (!otheruser) return;

        markChatAsRead(selectedChat._id);

        const messages = async () => {

            const allMessages = await getMessages(selectedChat._id)
            const transformed = allMessages.map(msg => ({
                ...msg,
                belongstouser: msg.from._id.toString() === UserId
            }));

            setPastMessages(transformed);

            // FIX: Mark existing unread messages as read
            transformed.forEach((msg) => {
                const receiverId =
                    msg.to?.toString?.() || msg.to;

                if (
                    receiverId === UserId &&
                    msg.status !== "Read"
                ) {
                    socket.emit("MESSAGE_READ", {
                        messageId: msg._id,
                    });
                }
            });

        }
        messages()


        // Initial Join
        // if (socket.connected) {
        //     socket.emit(ChatEvents.JOIN_ROOM, { chatId: selectedChat._id });
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ selectedChat, UserId]);


    useEffect(() => {
        if (!selectedChat) return;

        socket.emit(ChatEvents.JOIN_ROOM, {
            chatId: selectedChat._id,
        });

    }, [selectedChat, socket]);


    useEffect(() => {


        const handleReceiveMessage = async (recievedmessage) => {
            ;

            if (recievedmessage.Chat !== selectedChat._id) return;
            //  this is for the LIVE view. Global handles background counts.

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


        return () => {
            socket.off(ChatEvents.RECEIVE_MESSAGE, handleReceiveMessage);
            // socket.off("MESSAGE_UPDATE", handleMessageUpdated);
        };
    }, [socket, selectedChat, UserId,setPastMessages])

    useEffect(() => {
        const handleStatusChange = ({ messageId, status }) => {
            setPastMessages((prev) =>
                prev.map((msg) =>
                    msg._id === messageId
                        ? { ...msg, status }
                        : msg
                )
            );
        };

        socket.on("MESSAGE_STATUS_CHANGED", handleStatusChange);

        return () => {
            socket.off("MESSAGE_STATUS_CHANGED", handleStatusChange);
        };
    }, [socket,setPastMessages]);

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
