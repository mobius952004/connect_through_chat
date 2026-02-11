import { useContext, useState } from "react";
import ChatCard from "./ChatCard";
import { ChatContext } from "../../store/socketContext";
import { useEffect } from "react";
import { getChatList, setChatList } from "../../api/chat";
import SearchBar from "./SearchBar";
import { getAccessToken } from "../../utils/token";

export default function ChatList() {
  const { chatlist, setchatlist, selecteduser } = useContext(ChatContext);
  const[filteredChats,setFilteredChats]=useState([])

  useEffect(() => {
    // const accessToken = getAccessToken();

    const getchats = async () => {
      const chats = await getChatList();
      // console.log(chats);
      setchatlist(chats)
      setFilteredChats(chats);
    };

    // console.log(chatlist)
    getchats();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccessToken()]);

  useEffect(() => {
    if (!selecteduser) return;
    const accessToken = localStorage.getItem("accessToken");

    const createChat = async () => {
     const newChat= await setChatList({
        accessToken,
        selecteduserId: selecteduser._id,
        selectedusername: selecteduser.username,
      });
      if (newChat) {
        setchatlist((prev) => {
          // Prevent duplicates
          const exists = prev.find((c) => c._id === newChat._id);
          if (exists) return prev;
          return [newChat, ...prev];
        });
      }
    };
    createChat();
  }, );


  const search=(query)=>{
   console.log(query)
     if(!query.trim()){
      setFilteredChats(chatlist)
      return 
     }

     const searchText=query.toLowerCase()
    //  console.log(searchText)
     const searched= chatlist.filter(chat=> chat.chatName?.toLowerCase().includes(searchText))
    //  console.log(searched)
     setFilteredChats(searched)

  }

  return (
    <div className="flex-1 min-h-0 p-2 lg:w-[340px] overflow-y-scroll scrollbar-hide">
      <SearchBar onSearch={search}/>
      {filteredChats &&
        filteredChats.map((chat) => <ChatCard chat={chat} key={chat._id} />)}
    </div>
  );
}