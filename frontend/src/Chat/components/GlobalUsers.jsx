import SearchBar from "./SearchBar";
import ChatCard from "./ChatCard";
import { getallusers } from "../../api/auth";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { ChatContext } from "../../store/socketContext";

export default function GlobalUsers() {
  const { getCurrentUserId } = useContext(ChatContext);

  const userid = getCurrentUserId();
//   console.log(`${userid.type}globalusers`);
  const [allusers, setallusers] = useState([]);

  useEffect(() => {
    const showall = async () => {
      const response = await getallusers(userid);
      setallusers(response);
    };

    showall();
  }, [userid]);
  return (
    <div className="w-full h-full flex flex-col">
      <SearchBar />

      {allusers &&
        allusers.map((user) => <ChatCard user={user} key={user._id} />)}
    </div>
  );
}
