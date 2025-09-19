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

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    // console.log(accessToken)

    if (!accessToken) {
      return <div className="text-red-600"> Not authorized</div>;
    }

    const showall = async () => {
      const response = await getallusers(accessToken);
      setallusers(response);
    };

    showall();
  }, []);
  return (
    <div className="w-full h-full flex flex-col">
      <SearchBar />

      {allusers &&
        allusers.map((user) => <UserCard user={user} key={user._id} />)}
    </div>
  );
}
