import { useContext, useState } from "react";
import SearchBar from "../components/SearchBar";
import "flowbite"
import AddButton from "../components/AddButton";
import ChatList from "../components/ChatList";
import ChatBox from "../components/Chatbox";
import { ChatContext } from "../../store/socketContext";


export default function UserChats() {

    const [onadd, setonadd] = useState(false)
    const { userinfo } = useContext(ChatContext)
    return (
        <div className="flex-1 flex  gap-0.5 h-full">
            {/* chats containers */}
            <div className="flex flex-col w-[360px] relative  bg-gradient-to-t from-gray-900 to-gray-900  border-spacing-2 border-slate-500 border-2 ">
                <SearchBar />
                <ChatList />
                <AddButton onadd={onadd} setonadd={setonadd} />

            </div>
            {/* single chat / message container */}

            <ChatBox />
            {/* {userinfo &&
                <div className={`w-[360px] bg-slate-700 transform transition-transform duration-600 ease-in-out animate-pulse ${userinfo ? "translate-x-0" : "translate-x-full"}`}></div>

            } */}
            <div
                className={`overflow-hidden transition-all duration-500 bg-slate-500/50 ease-in-out 
          ${userinfo ? "w-[360px] opacity-100" : "w-0 opacity-0"}`}
            ></div>

        </div>







    )


}