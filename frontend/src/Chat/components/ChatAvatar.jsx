import { useContext } from "react"
import { ChatContext } from "../../store/socketContext"


export default function ChatAvatar(){
    const { setsidepanel} =useContext(ChatContext)
    const{selecteduser}=useContext(ChatContext)
    // console.log(selecteduser)

    if(!selecteduser) return null

    //whenever teh selected user cahnges , the user from the selected caht or the new chat ,should be the one  other than the current user , if it is not a gorup
    

    return (
        <button type="button" onClick={()=>setsidepanel("UserInfo")}>

        <div className="flex  items-center gap-4 bg-slate-900 w-full py-2  ">
    <img className="w-10 h-10 rounded-full" src="/vite.svg" alt=""/>
    <div className="font-medium dark:text-white">
        <div>{selecteduser.username}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
    </div>
</div>
        </button>
    )
}