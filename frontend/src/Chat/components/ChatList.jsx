import { useContext } from "react"
import ChatCard from "./ChatCard"
import { ChatContext } from "../../store/socketContext"
import { useEffect } from "react"
// import { useEffect } from "react"

export default function ChatList() {


    const { chatlist, setchatlist, selecteduser } = useContext(ChatContext)

    useEffect(() => {
        //re render if the selected user cahnges

// check if the user chat already exists or not through the api function , send the selected user id and the current userid 

//use api function here and send the selected user id to the backesnd  if the chat dosent exist 


// call the cahtlist from the backend consisting all the chats of the user

        if (!selecteduser) return; //check if the chatarray exists or not , rermove this line 

        setchatlist(prev => {
            const filtered = prev.filter(user => user._id !== selecteduser._id);
            return [selecteduser, ...filtered];
        });




    }, [selecteduser,setchatlist])
 
    

    return (
        <div className="flex-1 min-h-0 overflow-y-scroll scrollbar-hide">

            {chatlist && chatlist.map((user) => (
                <ChatCard user={user} key={user._id} />

            ))}


        </div>

    )
}