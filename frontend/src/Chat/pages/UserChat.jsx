import { useContext, useState } from "react";
import SearchBar from "../components/SearchBar";
import "flowbite"
import AddButton from "../components/AddButton";
import ChatList from "../components/ChatList";
import ChatBox from "../components/Chatbox";
import { ChatContext } from "../../store/socketContext";
import GlobalUsers from "../components/GlobalUsers";
import UserInfoPanel from "../components/UserInfoPanel";
import ForwardCheckList from "../components/forwardCheckList";
import CreateGroup from "../components/CreateGroup";



export default function UserChats() {


    const [onadd, setonadd] = useState(false)
    const { sidepanel, setsidepanel, selectedChat } = useContext(ChatContext)


    return (
        <div className="flex-1 flex  gap-0.5 h-full">
            {/* chats containers */}
            {/* Hidden on mobile if chat selected, visible on md+ always */}
            <div className={`flex-col  md:w-[340px] sm:w-[270px] bg-gray-900 border-spacing-2  border-0 border-white ${selectedChat ? "hidden md:flex" : "flex"
                }`}>
                {/* <SearchBar /> */}
                <ChatList />
                <AddButton onadd={onadd} setonadd={setonadd} />

            </div>
            {/* single chat / message container */}
            {/* Hidden on mobile if no chat selected, visible on md+ always (if space allows, typically flex-1) */}
           <div
  className={`
    flex-1 flex-col overflow-y-scroll scrollbar-hide
    ${selectedChat ? "flex" : "hidden md:flex"}
    ${sidepanel ? "hidden md:flex" : ""}
  `}
>
  {selectedChat ? (
    <ChatBox />
  ) : (
    <div className="hidden md:flex h-full items-center justify-center text-gray-400 flex-col gap-4">
      <img src="/chat_bg.jpg" className="w-full h-full opacity-70" />
      <p className="text-4xl z-20 absolute ">Select a chat to get started</p>
    </div>
  )}
</div>
            <div
        className={`
    bg-gray-950 border-l border-slate-900
    transition-all duration-300 ease-in-out

    fixed inset-0 z-40
    ${sidepanel ? "opacity-100" : "opacity-0 pointer-events-none"}
    md:overflow-hidden
    md:z-auto
    md:inset-auto
    md:relative
    md:opacity-100 md:pointer-events-auto
    md:transition-[width] md:duration-300
    ${sidepanel ? "md:w-[400px] w:[250px]" : "md:opacity-0 md:w-0"}
  `}
            >
                {sidepanel !== "UserInfo" && (
                    <div className="flex justify-between items-center p-4 border-b bg-gray-950 border-slate-900">
                        <h2 className="text-lg text-emerald-200 font-semibold capitalize">{sidepanel}</h2>
                        <button
                            onClick={() => setsidepanel(null)}
                            className="text-xl text-emerald-200 font-bold hover:text-slate-400"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {sidepanel == "UserInfo" && <UserInfoPanel />}
                {sidepanel == "AddFriend" && <GlobalUsers />}
                {sidepanel == "Forward" && <ForwardCheckList />}
                {sidepanel=="Create Group"&&<CreateGroup/>}

            </div>


        </div>







    )


}