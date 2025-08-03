import ChatCard from "./ChatCard";


export default function UserChats() {


    return (
        <div className="flex-1 flex gap-1 h-full">
            <div className="w-[400px] bg-gradient-to-t from-gray-900 via-gray-600 to-gray-900  border-spacing-2 border-green-400 border-2">
<ChatCard/>

            </div>

            <div className=" flex-1 bg-gradient-to-t from-gray-900 via-gray-600 to-gray-900">


            </div>
        </div>




    )


}