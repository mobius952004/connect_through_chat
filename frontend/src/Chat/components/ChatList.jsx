import { useContext } from "react"
import ChatCard from "./ChatCard"
import { ChatContext } from "../../store/socketContext"
import { useEffect } from "react"
// import { useEffect } from "react"

export default function ChatList() {


    const { chatlist, setchatlist, selecteduser } = useContext(ChatContext)

    useEffect(() => {

        if (!selecteduser) return;

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