import { useState } from "react";
import ChatAvatar from "../components/ChatAvatar";
import ChatCard from "../components/ChatCard";
import SearchBar from "../components/SearchBar";
import TextBox from "../components/TextBox";
import { PlusCircle } from "lucide-react";
import ChatBubble from "../components/LeftChatBubble";
import RightChatBubble from "../components/RightChatBubble";


export default function UserChats() {

const[onadd,setonadd]= useState(false)
    return (
        <div className="flex-1 flex gap-0.5 h-full">
            <div className="w-[400px] relative  bg-gradient-to-t from-gray-900 to-gray-900  border-spacing-2 border-slate-500 border-2">
                <SearchBar />
                <ChatCard />



                <button type="button" onClick={()=>setonadd(!onadd)} class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 absolute bottom-4 right-4">
                    <spam>
                        <PlusCircle />
                    </spam>
                </button>
                {onadd &&       <div
        className={`absolute bottom-20 right-4 w-64 h-48 bg-slate-800 shadow-lg rounded-lg transition-transform duration-1000 text-slate-400 ${
          onadd ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none "
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold">Modal Title</h2>
          <p className="text-sm text-slate-600">This is a bottom-up modal.</p>
        </div>
      </div>}





            </div>

            <div className=" flex-1 relative bg-gradient-to-t from-gray-900 to-gray-900 flex flex-col overflow-y-auto ">

                <ChatAvatar />
                <div className="bg-slate-600   flex-1  flex flex-col-reverse overflow-y-scroll  ">

<RightChatBubble/>
<ChatBubble/>
<ChatBubble/>
<ChatBubble/>



                </div>
                <div className="">
                    <TextBox />
                </div>
            </div>
        </div>




    )


}