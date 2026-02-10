import { useContext ,useState ,useEffect} from "react";
import { ChatContext } from "../../store/socketContext";
import SearchBar from "./SearchBar";
import CheckCard from "./CheckCard";

export default function ForwardCheckList(){

const{chatlist} = useContext(ChatContext)

const[filteredChats,setFilteredChats]=useState([])

useEffect(() => {
  setFilteredChats(chatlist);
}, [chatlist]);

 const search=(query)=>{
   console.log(query)
     if(!query.trim()){
      setFilteredChats(chatlist)
      return 
     }

     const searchText=query.toLowerCase()
    //  console.log(searchText)
     const searched= chatlist.filter(chat=> chat.chatName?.toLowerCase().includes(searchText))
    //  console.log(searched)
     setFilteredChats(searched)

  }

  return (
    <div className="flex-1 min-h-0 p-2 lg:w-[340px] overflow-y-scroll scrollbar-hide">
      <SearchBar onSearch={search}/>
      {filteredChats &&
        filteredChats.map((chat) => <CheckCard chat={chat} key={chat._id} />)}
    </div>
  );

}

// const [query, setQuery] = useState("");

// const filteredChats = chatlist.filter(chat =>
//   chat.chatName?.toLowerCase().includes(query.toLowerCase())
// );
{/* <SearchBar onSearch={setQuery} />
{filteredChats.map(chat => (
  <ChatCard chat={chat} key={chat._id} />
))} */}
