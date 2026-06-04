import { useContext, useEffect, useRef, useState } from "react"
import { ChatContext } from "../../store/socketContext"
import SearchBar from "./SearchBar"
import CheckCard from "./CheckCard"
import UserGroupCard from "./SelectuserGroup"
import { IoAddCircleOutline } from "react-icons/io5"
import { createGroupChat } from "../../api/chat"


export default function CreateGroup() {

  const { chatlist, createGroup, setsidepanel, setCreateGroup } = useContext(ChatContext)
  const [filteredChats, setFilteredChats] = useState([])

  const groupName = useRef(null)



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

  const handleCancel = () => {
    setCreateGroup([])
    setsidepanel(null)


  }
  const Name = groupName.current?.value
  const handleCreate = async () => {

    await createGroupChat({ createGroup, Name })
  }


  return (

    <div className="bg-gray-900 h-full w-full">

      <div className="flex justify-between items-center mb-2 px-2">
        <h3 className="text-white font-semibold">Members {createGroup.length} </h3>
        <button onClick={handleCancel} className="text-gray-400 hover:text-white text-sm">Cancel</button>
      </div>

      <div>
        <input type="text"
          placeholder="Enter Group Name "
          ref={groupName}

          className="w-full rounded-2xl bg-slate-600 text-gray-600 focus:border-green-500 my-3 ">
        </input>

      </div>

      <div className="flex-1 relative h-full w-full p-2  overflow-y-scroll scrollbar-hide">
        <div className="sticky z-20 top-0 bg-gray-900">
        <SearchBar onSearch={search} />

        </div>
        {filteredChats &&
          filteredChats.map((chat) => <UserGroupCard chat={chat} key={chat._id} />)}

      </div>

      {createGroup.length > 0 && (
        <div className=" bottom-2 right-4 fixed text-left rounded-full inline-block shadow-lg transition-colors p-3">
          <button onClick={handleCreate} >
            <IoAddCircleOutline className="h-15 w-15 text-green-500" />
          </button>
        </div>
      )}




    </div>


  )

}