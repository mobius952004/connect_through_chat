import { useContext } from "react";
import ChatCard from "./ChatCard";
import { ChatContext } from "../../store/socketContext";
import { useEffect } from "react";
import { getChatList, setChatList } from "../../api/auth";
// import { useEffect } from "react"

export default function ChatList() {
  const { chatlist, setchatlist, selecteduser } = useContext(ChatContext);



useEffect(()=>{
  const accessToken=localStorage.getItem("accessToken")
    
    const getchats=async ()=>{
    
      const chats= await getChatList(accessToken)
      console.log(chats)
      setchatlist(chats);
    }

    console.log(chatlist)
    getchats()


// eslint-disable-next-line react-hooks/exhaustive-deps
},[])



  useEffect(() => {

    if (!selecteduser) return; 
    const accessToken=localStorage.getItem("accessToken")
    
 const createChat = async () => {
        await setChatList({
            accessToken,
            selecteduserId: selecteduser._id,
            selectedusername: selecteduser.username,
        });
    };
    createChat();
  }, [selecteduser]);

  return (
    <div className="flex-1 min-h-0 overflow-y-scroll scrollbar-hide">
      {chatlist &&
        chatlist.map((chat) => <ChatCard chat={chat} key={chat._id} />)}
    </div>
  );
}
