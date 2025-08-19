import SearchBar from "./SearchBar"
import ChatCard from "./ChatCard"
import { getallusers } from "../../api/auth"
import { useEffect } from "react"
import { useState } from "react"

export default function GlobalUsers() {


    const [allusers, setallusers] = useState([])

    useEffect(() => {

        const showall = async () => {

            const response = await getallusers()
            setallusers(response)
        }
        
        showall()
    }, [])
    return (


        <div className="w-full h-full flex flex-col">
            <SearchBar />

            {allusers && allusers.map((user) => (
                <ChatCard user={user} key={user._id} />
                
            ))}


        </div>
    )
}