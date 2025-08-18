import { useContext, useState } from "react";
import SearchBar from "../components/SearchBar";
import "flowbite"
import AddButton from "../components/AddButton";
import ChatList from "../components/ChatList";
import ChatBox from "../components/Chatbox";
import { ChatContext } from "../../store/socketContext";
import GlobalUsers from "../components/GlobalUsers";


export default function UserChats() {

    const [onadd, setonadd] = useState(false)
    const { sidepanel ,setsidepanel} = useContext(ChatContext)
    return (
        <div className="flex-1 flex  gap-0.5 h-full">
            {/* chats containers */}
            <div className="flex flex-col w-[340px] relative  bg-gradient-to-t from-gray-900 to-gray-900  border-spacing-2 border-slate-500 border-2 ">
                <SearchBar />
                <ChatList />
                <AddButton onadd={onadd} setonadd={setonadd} />

            </div>
            {/* single chat / message container */}

            <ChatBox />
            <div
                className={`overflow-hidden transition-all duration-500 bg-slate-500/50 ease-in-out 
          ${sidepanel ? "w-[400px] opacity-100" : "w-0 opacity-0"}`}
            >
                <div className="flex justify-between items-center p-4 border-b bg-slate-700 border-slate-900">
                    <h2 className="text-lg font-semibold capitalize">{sidepanel}</h2>
                    <button
                        onClick={() => setsidepanel(null)}
                        className="text-xl font-bold hover:text-slate-400"
                    >
                        ✕
                    </button>
                </div>

                {sidepanel == "UserInfo" && <div className="h-full w-full bg-amber-600 overflow-y-scroll scrollbar-hidden"> </div>}
                {sidepanel == "AddFriend" &&  <GlobalUsers/>}

            </div>
  

        </div>







    )


}