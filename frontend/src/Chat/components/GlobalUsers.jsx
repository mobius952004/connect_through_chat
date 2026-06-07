import SearchBar from "./SearchBar";
import UserCard from "./UserCard";
import { getallusers } from "../../api/userApi";
import { useEffect } from "react";
import { useState } from "react";
import { setChatList } from "../../api/chat";
import { ChatContext } from "../../store/socketContext";

// import { useContext } from "react";
// import { ChatContext } from "../../store/socketContext";

export default function GlobalUsers() {

  const [allusers, setallusers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); //filtered users

  // const { setchatlist } = useContext(ChatContext)

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return <div className="text-red-600"> Not authorized</div>;
    }

    const showAll = async () => {
      const response = await getallusers();
      setallusers(response);
      setFilteredUsers(response);
    };

    showAll();
  }, [])

  const searching = (query) => {
    if (!query.trim()) {
      setFilteredUsers(allusers);
      return;
    }

    const searchText = query.toLowerCase();

    const results = allusers.filter(user => {
      return user.username?.toLowerCase().includes(searchText);
    });

    setFilteredUsers(results);
  }

  const handleUserClick = async (user) => {
    // 1. Create/Fetch chat via API
    try {
      const accessToken = localStorage.getItem("accessToken");
       await setChatList({
        accessToken,
        selecteduserId: user._id,
        selectedusername: user.username
      });

      // 2. Update Context DIRECTLY
      // if (chat) {
      //   setchatlist(prev => {
      //     const exists = prev.find(c => c._id === chat._id);
      //     if (exists) return prev;
      //     return [chat, ...prev]; // Add to top
      //   });


      // }


    } catch (error) {
      console.error("Failed to create chat", error);
    }
  };




  return (

    
    <div className="w-full h-full  overflow-y-scroll scrollbar-hide flex flex-col bg-gray-950 border-emerald-300/60 border-1">
       <div className="sticky top-0 z-20 bg-gray-950">
    <SearchBar onSearch={searching} />
  </div>

      {filteredUsers
        && filteredUsers.map((user) => <UserCard handleUserClick={handleUserClick} user={user} key={user._id} />)}
    </div>
  );
}
