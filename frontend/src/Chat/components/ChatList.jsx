import { useContext, useState } from "react";
import ChatCard from "./ChatCard";
import { ChatContext } from "../../store/socketContext";
import { useEffect } from "react";
import { getChatList, setChatList } from "../../api/auth";
import SearchBar from "./SearchBar";
import { getAccessToken } from "../../utils/token";

export default function ChatList() {
  const { chatlist, setchatlist, selecteduser } = useContext(ChatContext);
  const[filtereChats,setFilteredChats]=useState([])

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
      await setChatList({
        accessToken,
        selecteduserId: selecteduser._id,
        selectedusername: selecteduser.username,
      });
    };
    createChat();
  }, [selecteduser]);


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
    <div className="flex-1 min-h-0 overflow-y-scroll scrollbar-hide">
      <SearchBar onSearch={search}/>
      {filtereChats &&
        filtereChats.map((chat) => <ChatCard chat={chat} key={chat._id} />)}
    </div>
  );
}