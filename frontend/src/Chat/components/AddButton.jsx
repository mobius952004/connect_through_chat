import "flowbite"
import { PlusCircle } from "lucide-react";
import { useContext } from "react";
import { useEffect, useRef } from "react";
import { ChatContext } from "../../store/socketContext";




import CreateGroupModal from "./CreateGroup";

export default function AddButton({ onadd, setonadd }) {

   const menuRef = useRef(null);
   const { setsidepanel } = useContext(ChatContext)


   useEffect(() => {

      function handleClickOutside(e) {
         if (menuRef.current && !menuRef.current.contains(e.target)) {
            setonadd(false);
         }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, [setonadd]);


   return (<>
      <div className="relative inline-block text-left" ref={menuRef}>

         <button type="button" id="AddButton" onClick={() => setonadd(!onadd)} className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-3 focus:outline-none  focus:ring-green-300 font-medium rounded-full text-sm px-4 py-4 text-center me-2 mb-2  dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 absolute bottom-4 right-4 ">
            <span>
               <PlusCircle />
            </span>
         </button>

         {onadd && <div
            className={`absolute bottom-25 right-4 w-64 h-45 bg-slate-800 shadow-lg rounded-lg transition-transform duration-1000 text-slate-400 ${onadd ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none "
               }`}
         >

            <ul className="text-sm text-gray-700 dark:text-gray-200" >
               <li>
                  <button type="button" id="Add Friend" onClick={() => setsidepanel("AddFriend")} className="text-start w-full rounded-t-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Add Friend</button>
               </li>
               <li>
                  <button type="button" id="Create Group" onClick={() => { setonadd(false);setsidepanel("Create Group") }} className="w-full block px-4 py-2 text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Create Group</button>
               </li>
               <li>
                  <button type="button" id="Join Group" className="w-full block px-4 py-2 text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Join Group</button>
               </li>
               <li>
                  <button type="button" id="Manage Group" className="w-full block px-4 py-2 text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Manage Chats</button>
               </li>
               <li>
                  <button type="button" id="Archive" className="w-full block text-start rounded-b-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Archive</button>
               </li>
            </ul>
         </div>
         }
      </div>
   </>
   )
}