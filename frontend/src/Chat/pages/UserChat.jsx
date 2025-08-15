import { useState } from "react";
import SearchBar from "../components/SearchBar";
import "flowbite"
import AddButton from "../components/AddButton";
import ChatList from "../components/ChatList";
import ChatBox from "../components/Chatbox";


export default function UserChats() {

    const [onadd, setonadd] = useState(false)
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

        </div>




    )


}