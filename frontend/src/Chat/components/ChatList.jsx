import { useContext, useState } from "react";
import ChatCard from "./ChatCard";
import { ChatContext } from "../../store/socketContext";
import { useEffect } from "react";
import { getChatList,
  //  setChatList
   } from "../../api/chat";
import SearchBar from "./SearchBar";
// import { getAccessToken } from "../../utils/token";

export default function ChatList() {
  const { chatlist, setchatlist,} = useContext(ChatContext);
  const [searchText,setSearchText] = useState("")

  useEffect(() => {
    // const accessToken = getAccessToken();

    const getchats = async () => {
      const chats = await getChatList();
      // console.log(chats);
      setchatlist(chats)

    };

    console.log(chatlist)
    getchats();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


const filteredChats = chatlist.filter(chat =>
  chat.chatName?.toLowerCase()
      .includes(searchText.toLowerCase())
);


  const search = (query) => {
   setSearchText(query)

  }

  return (
    <div className="flex-1 min-h-0 p-2 lg:w-[340px] overflow-y-scroll scrollbar-hide">
      <SearchBar onSearch={search} />
      {filteredChats &&
        filteredChats.map((chat) => <ChatCard chat={chat} key={chat._id} />)}

    </div>
  );
}