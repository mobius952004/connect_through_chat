import { createContext, useRef,  } from "react";
import { socket } from "../sockets/socket";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
// import { ThermometerSnowflakeIcon } from "lucide-react";
const ChatContext = createContext();

export default function ChatProvider({ children }) {




  function getCurrentUser() {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) return null
    // console.log(decoded.username);

    return {
      userId: decoded.sub,
      username: decoded.username,
    };
  }



  const [userinfo, setuserinfo] = useState(false);
  const [sidepanel, setsidepanel] = useState("");
  const [selecteduser, setselecteduser] = useState(null);
  const [chatlist, setchatlist] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null)


  //messages
      const [textMessage, setTextMessage] = useState("");
    const [pastMessages, setPastMessages] = useState([]);
    const replyref = useRef(null)
const [replyMessage, setReplyMessage] = useState(null);

    const value = {
  textMessage,
  setTextMessage,
  replyMessage,
  setReplyMessage,
};


  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      // 1. Don't count own messages
      const currentUser = getCurrentUser();
      if (newMessage.from === currentUser?.userId) return;

      // 2. If the message belongs to the currently open chat, do NOT increment
      //    (Using a functional state update to access the LATEST selectedChat if needed, 
      //     but here we depend on the closure variable 'selectedChat' from the render scope.
      //     Since we add 'selectedChat' to the dependency array, this listener recreation is fine.)
      if (selectedChat && newMessage.Chat === selectedChat._id) {
        return;
      }

      // 3. Increment unread count for this specific chat
      setUnreadCounts((prev) => ({
        ...prev,
        [newMessage.Chat]: (prev[newMessage.Chat] || 0) + 1,
      }));
      console.log("Global Listener: New message in chat", newMessage.Chat);
    };

    socket.on("RECEIVE_MESSAGE", handleNewMessage);

    return () => {
      socket.off("RECEIVE_MESSAGE", handleNewMessage);
    };
  }, [selectedChat]); // Re-bind listener when selectedChat changes

  const markChatAsRead = (chatId) => {
    setUnreadCounts((prev) => {
      const newCounts = { ...prev };
      delete newCounts[chatId]; // Remove the entry to reset count to 0 (or undefined)
      return newCounts;
    });
  };

  return (
    <ChatContext.Provider
      value={{
        socket,
        userinfo,
        setuserinfo,
        sidepanel,
        setsidepanel,
        selecteduser,
        setselecteduser,
        getCurrentUser,
        chatlist,
        setchatlist,
        selectedChat,
        setSelectedChat,
        unreadCounts,      // Exposed
        markChatAsRead,    // Exposed

        // messages
        replyref,
        textMessage,
        setTextMessage,
        pastMessages,
        setPastMessages,
        replyMessage,
        setReplyMessage,
        value,

      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export { ChatContext };
