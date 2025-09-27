import SearchBar from "./SearchBar";
import UserCard from "./UserCard";
import { getallusers } from "../../api/auth";
import { useEffect } from "react";
import { useState } from "react";
// import { useContext } from "react";
import { ChatContext } from "../../store/socketContext";

export default function GlobalUsers() {
  // const { getCurrentUser } = useContext(ChatContext);

  // const userid = getCurrentUser();
  //   console.log(`${userid.type}globalusers`);
  const [allusers, setallusers] = useState([]);
  const [search, setSearch] = useState(""); // search text
  const [filteredUsers, setFilteredUsers] = useState([]); //filtered users

  const searching = (query) => {

    if(!query.trim()) {
      setFilteredUsers(allusers);
      return;
    }

    const searchText = query.toLowerCase();

    const results = allusers.filter(user => {
      return user.username?.toLowerCase().includes(searchText);
    });

    setFilteredUsers(results);
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
  
    if (!accessToken) {
      return <div className="text-red-600"> Not authorized</div>;
    }

    const showAll = async () => {
      const response = await getallusers(accessToken);
      setallusers(response);
      setFilteredUsers(response);
    };

    showAll();
  }, [])

  const handleSearch = (query) => {
    setSearch(query);
    searching(query);
  }

  
  return (
    <div className="w-full h-full flex flex-col bg-gray-950 border-emerald-300/60 border-1">
      <SearchBar onSearch={handleSearch}/>

      {filteredUsers 
      && filteredUsers.map((user) => <UserCard user={user} key={user._id} />)}
    </div>
  );
}
