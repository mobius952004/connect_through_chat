import { useContext, useState } from "react";
import SearchBar from "../components/SearchBar";
import "flowbite"
import AddButton from "../components/AddButton";
import ChatList from "../components/ChatList";
import ChatBox from "../components/Chatbox";
import { ChatContext } from "../../store/socketContext";
import GlobalUsers from "../components/GlobalUsers";
// import { useEffect } from "react";



export default function UserChats() {

    //   const [error, setError] = useState(null);

    const [onadd, setonadd] = useState(false)
    const { sidepanel, setsidepanel, selectedChat } = useContext(ChatContext)




    //     useEffect(() => {
    //       const accessToken = localStorage.getItem("accessToken");
    //       if (!accessToken) {
    //         setError("Session Expired");
    //         return ;
    //       }
    //   },[]);

    //   if (error) return <div className="text-red-400 text-center mt-6">{error}</div>;

    return (
        <div className="flex-1 flex  gap-0.5 h-full">
            {/* chats containers */}
            {/* Hidden on mobile if chat selected, visible on md+ always */}
            <div className={`flex-col  md:w-[340px] lg:w-[340px] relative bg-gray-900 border-spacing-2  border-1 ${selectedChat ? "hidden md:flex" : "flex"
                }`}>
                {/* <SearchBar /> */}
                <ChatList />
                <AddButton onadd={onadd} setonadd={setonadd} />

            </div>
            {/* single chat / message container */}
            {/* Hidden on mobile if no chat selected, visible on md+ always (if space allows, typically flex-1) */}
            <div className={`flex-1 flex-col ${selectedChat ? "flex" : "hidden md:flex"}`}>
                <ChatBox />
            </div>
            <div
                className={`overflow-hidden transition-all duration-500 bg-slate-500/50 ease-in-out 
          ${sidepanel ? "w-[400px] opacity-100" : "w-0 opacity-0"}`}
            >
                <div className="flex justify-between items-center p-4 border-b bg-gray-950 border-slate-900">
                    <h2 className="text-lg text-emerald-200 font-semibold capitalize">{sidepanel}</h2>
                    <button
                        onClick={() => setsidepanel(null)}
                        className="text-xl text-emerald-200 font-bold hover:text-slate-400"
                    >
                        ✕
                    </button>
                </div>

                {sidepanel == "UserInfo" && <div className="h-full w-full bg-gray-950  overflow-y-scroll scrollbar-hidden"> </div>}
                {sidepanel == "AddFriend" && <GlobalUsers />}

            </div>


        </div>







    )


}