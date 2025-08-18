import "flowbite"
import { PlusCircle } from "lucide-react";
import { useContext } from "react";
import { useEffect, useRef } from "react";
import { ChatContext } from "../../store/socketContext";



export default function AddButton({ onadd, setonadd }) {

   const menuRef = useRef(null);
   const {setsidepanel}=useContext(ChatContext)
   

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

         <button type="button" onClick={() => setonadd(!onadd)} className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 absolute bottom-4 right-4 ">
            <span>
               <PlusCircle />
            </span>
         </button>
         {onadd && <div
            className={`absolute bottom-20 right-4 w-64 h-45 bg-slate-800 shadow-lg rounded-lg transition-transform duration-1000 text-slate-400 ${onadd ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none "
               }`}
         >

            <ul className="text-sm text-gray-700 dark:text-gray-200" >
               <li>
                  <button type="button" onClick={()=>setsidepanel("AddFriend")} className=" w-full rounded-t-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Add Friend</button>
               </li>
               <li>
                  <button type="button" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">mark as readed</button>
               </li>
               <li>
                  <button type="button" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">removeh</button>
               </li>
               <li>
                  <button type="button" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</button>
               </li>
               <li>
                  <button type="button" className="block rounded-b-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</button>
               </li>
            </ul>
         </div>
         }
      </div>
   </>
   )
}