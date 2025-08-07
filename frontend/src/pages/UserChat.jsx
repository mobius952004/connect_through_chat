import ChatAvatar from "../components/ChatAvatar";
import ChatCard from "../components/ChatCard";
import SearchBar from "../components/SearchBar";
import TextBox from "../components/TextBox";


export default function UserChats() {


    return (
        <div className="flex-1 flex gap-0.5 h-full">
            <div className="w-[400px] bg-gradient-to-t from-gray-900 to-gray-900  border-spacing-2 border-green-400 border-2">
                <SearchBar />
                <ChatCard />

            </div>

            <div className=" flex-1 relative bg-gradient-to-t from-gray-900 to-gray-900 flex flex-col overflow-y-auto ">

                <ChatAvatar />
<div className="bg-slate-600  flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 "></div>
                <div className="">
                    <TextBox />
                </div>
            </div>
        </div>




    )


}