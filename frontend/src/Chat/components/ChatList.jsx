import { useContext } from "react";
import ChatCard from "./ChatCard";
import { ChatContext } from "../../store/socketContext";
import { useEffect } from "react";
import { getChatList, setChatList } from "../../api/auth";
// import { useEffect } from "react"

export default function ChatList() {
  const { chatlist, setchatlist, selecteduser } = useContext(ChatContext);

  useEffect(() => {
    // console.log(selecteduser)
    //re render if the selected user cahnges
    if (!selecteduser) return; //check if the chatarray exists or not , rermove this line

    // check if the user chat already exists or not through the api function , send the selected user id and the current userid
    const accessToken=localStorage.getItem("accessToken")

    
    setChatList({accessToken,
      selecteduserId: selecteduser?._id,
      selectedusername: selecteduser?.username,
    });



    //use api function here and send the selected user id to the backend  if the chat dosent exist
    
    
    // call the cahtlist from the backend consisting all the chats of the user
const getchats=async ()=>{

  const chats= await getChatList(accessToken)
  console.log(chats)
  await setchatlist((prev) => {
    // const filtered = prev.filter((chat) => chat._id !== ._id);
    return [chats, ...prev];
  });
  
}


getchats()

  }, [selecteduser]);

  return (
    <div className="flex-1 min-h-0 overflow-y-scroll scrollbar-hide">
      {chatlist &&
        chatlist.map((user) => <ChatCard user={user} key={user._id} />)}
    </div>
  );
}
