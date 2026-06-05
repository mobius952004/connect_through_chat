import { useContext, useEffect, useRef, useState } from "react"
import { ChatContext } from "../../store/socketContext"
import SearchBar from "./SearchBar"
import CheckCard from "./CheckCard"
import UserGroupCard from "./SelectuserGroup"
import { IoAddCircleOutline } from "react-icons/io5"
import { createGroupChat } from "../../api/chat"
import UserCard from "./UserCard"
import { getallusers } from "../../api/userApi"


export default function CreateGroup() {

  const { chatlist, createGroup, setsidepanel, setCreateGroup,  getCurrentUser} = useContext(ChatContext)
  const[showList,setshowList]= useState("knownUsers")
  const [searched , setSearched] = useState("")
  const[allUsers,setAllUsers]=useState([])

  const groupName = useRef(null)


useEffect(() => {

    const showAll = async () => {
      const response = await getallusers();
      setAllUsers(response);

    };

    showAll();
  }, [])

 const userId= getCurrentUser().userId;
const knownUsers = chatlist.filter(chat=>!chat.isGroup).map(chat =>
    chat.users.find(
      user =>
        user._id !== userId
    ))

// console.log(knownUsers)
const filteredChats= knownUsers.filter(chat=>{ return (
  
  chat.username?.toLowerCase().includes(searched.toLowerCase())
)
})
// console.log(filteredChats)

const filteredUsers = allUsers.filter(user => 
  user.username
      .toLowerCase()
      .includes(searched.toLowerCase())
)

  const search = (query) => {
   setSearched(query)

  }

  const handleCancel = () => {
    setCreateGroup([])
    setsidepanel(null)


  }
  const handleCreate = async () => {
    
    const Name = groupName.current?.value
    console.log(Name)
    console.log(createGroup)
    
     if (!Name) return;

  if (createGroup.length < 2) return;
    await createGroupChat({ createGroup, Name })
  }


  return (

    <div className="bg-gray-900 h-full w-full">

        <div className="sticky z-20 top-0 bg-gray-900">
        <SearchBar onSearch={search} />

        </div>
      <div className="flex justify-between items-center mb-2 px-2">
        <h3 className="text-white font-semibold">Members {createGroup.length} </h3>
        <button onClick={handleCancel} className="text-gray-400 hover:text-white text-sm">Cancel</button>
      </div>

      <div>
        <input type="text"
          placeholder="Enter Group Name "
          ref={groupName}

          className="w-full rounded-2xl bg-slate-600 text-white focus:border-green-500 my-3 ">
        </input>

      </div>
      <div className="flex flex-row  justify-between border-b-2 border-green-500" >
         <button type="button" className=  {` w-full   md:text-[15px] sm:text-[10px] hover:text-green-400  bg-gray-900 border-r-2 border-green-500 ${showList==="knownUsers" ? "text-green-200" : "text-green-500" } `}
            onClick={()=> setshowList("knownUsers")} >
             <p>known Chats</p>
         </button>

         <button type="button" className= {` w-full   md:text-[15px] sm:text-[10px] hover:text-green-400  bg-gray-900 border-r-2 border-green-500 ${showList==="allusers" ? "text-green-200" : "text-green-500" } `}
         onClick={()=> setshowList("allusers")}>
        <p>Global Chate</p>
         </button>

        
      </div>


      <div className="flex-1 relative h-full w-full p-2   overflow-y-scroll scrollbar-hide">
        { 
        showList==="knownUsers"&& 
          filteredChats.map((user) => <UserGroupCard user={user} key={user._id} />)}
        { 
        showList==="allusers"&& 
          filteredUsers.map((user) => < UserGroupCard user={user} key={user._id} />)}

      </div>

      {createGroup.length > 2 && (
        <div className=" bottom-2 right-4 fixed text-left rounded-full inline-block shadow-lg transition-colors p-3">
          <button onClick={handleCreate} >
            <IoAddCircleOutline className="h-15 w-15 text-green-500" />
          </button>
        </div>
      )}




    </div>


  )

}