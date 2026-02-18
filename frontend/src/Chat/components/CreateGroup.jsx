import { useContext,useEffect,useState } from "react"
import { ChatContext } from "../../store/socketContext"
import SearchBar from "./SearchBar"
import CheckCard from "./CheckCard"
import UserGroupCard from "./SelectuserGroup"


export default function CreateGroup(){

const {chatlist }=useContext(ChatContext)
  const [filteredChats, setFilteredChats] = useState([])



 useEffect(() => {
    setFilteredChats(chatlist);
    console.log(chatlist)
  }, [chatlist]);


  const search = (query) => {
    console.log(query)
    if (!query.trim()) {
      setFilteredChats(chatlist)
      return
    }

    const searchText = query.toLowerCase()
    //  console.log(searchText)
    const searched = chatlist.filter(chat => chat.chatName?.toLowerCase().includes(searchText))
    //  console.log(searched)
    setFilteredChats(searched)

  }


return (

<div className="bg-gray-900 h-full w-full">

    <div>
        <input type="text"
        placeholder="Enter Group Name "
        
        className="w-full rounded-4xl bg-slate-700 text-green-500 focus:border-green-500 my-3 ">
        </input>

    </div>

     <div className="flex-1 relative h-full w-full p-2  overflow-y-scroll scrollbar-hide">
          <SearchBar onSearch={search} />
          {filteredChats &&
            filteredChats.map((chat) => <UserGroupCard chat={chat} key={chat._id} />)}
    
    </div>




</div>


)

}