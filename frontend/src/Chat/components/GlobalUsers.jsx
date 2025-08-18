import SearchBar from "./SearchBar"
import ChatCard from "./ChatCard"

export default function GlobalUsers(){

    const GetAllUsers=()=>{
 return ["u1","u2","u3","u4"]
    }
    return (


        <div className="w-full h-full flex flex-col">
         <SearchBar/>
        
        {["u1","u2","u3","u4"].map((user)=>(
        <ChatCard user={user}/>
        ))}


        </div>
    )
}