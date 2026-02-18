import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../store/socketContext";
import SearchBar from "./SearchBar";
import CheckCard from "./CheckCard";
import { ArrowBigRight } from "lucide-react";
import { IoArrowForwardCircle } from "react-icons/io5";

export default function ForwardCheckList() {

  const { chatlist, socket, forwardMessage, setForwardMessage, forwardTo, setForwardTo, setsidepanel } = useContext(ChatContext)

  const [filteredChats, setFilteredChats] = useState([])

  const handleForward = () => {

    socket.emit("forward:messages", {
      forwardMessage,
      forwardTo,
    });

    setForwardMessage([]);
    setForwardTo([]);
    setsidepanel(null);
  }

  const handleCancel = () => {
    setForwardMessage([]);
    setForwardTo([]);
    setsidepanel(null);
  }

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
    <div className="flex-1 relative h-full w-full p-2  overflow-y-scroll scrollbar-hide">
      <div className="flex justify-between items-center mb-2 px-2">
        <h3 className="text-white font-semibold">Forward {forwardMessage.length} message(s)</h3>
        <button onClick={handleCancel} className="text-gray-400 hover:text-white text-sm">Cancel</button>
      </div>
      <SearchBar onSearch={search} />
      {filteredChats &&
        filteredChats.map((chat) => <CheckCard chat={chat} key={chat._id} />)}

      {forwardTo.length > 0 && (
        <div className=" bottom-2 right-4 fixed text-left rounded-full inline-block shadow-lg transition-colors p-3">
          <button onClick={handleForward} >
            <IoArrowForwardCircle className="h-15 w-15 text-green-500" />
          </button>
        </div>
      )}
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
