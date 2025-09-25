import { EllipsisVerticalIcon } from "lucide-react";
import { useEffect } from "react";
import { useRef } from "react";
// import "flowbite";
import { useState } from "react";

export default function PrevChat({msg}) {

  const menueRef=useRef(null)
  const [menueopen,setmenueopen]=useState(false)
  

  useEffect(()=>{

    const outsideclick=(e)=>
      {
        if(menueRef.current && !menueRef.current.contains(e.target)){setmenueopen(false)}
      }
      
      document.addEventListener("mousedown", outsideclick);
      return () => document.removeEventListener("mousedown", outsideclick);
  },[menueRef])

  return (
    <div className={`flex items-start gap-2.5 group relative  ${msg.belongstouser?"self-end flex-row-reverse":"self-start flex-row"}`}ref={menueRef}>
      <img className="w-8 h-8 rounded-full" src="/react.svg" alt="Jese image" />
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className={`flex items-center space-x-2 ltr:space-x-reverse ${msg.belongstouser ? "justify-end space-x-reverse" : "space-x-2"}`}>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {msg.from.username}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {msg.time }&nbsp;{msg.date}
          </span>
        </div>
        <div className={`flex flex-col flex-wrap leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl  ${msg.belongstouser?"bg-gray-600 rounded-ss-xl":"dark:bg-green-600"} `}>
          <p className="text-sm font-normal  text-gray-900 dark:text-white whitespace-pre-wrap break-all">
            {msg.content}
          </p>
        </div>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          {msg.status}
        </span>
      </div>
      <button

        className=  {`inline-flex self-center items-center  p-2 text-sm font-medium text-center text-gray-900 rounded-lg focus:ring-0 focus:outline-none dark:text-white opacity-0 group-hover:opacity-100`}
        type="button"
        onClick={()=>setmenueopen(!menueopen)}

      >
        <EllipsisVerticalIcon />
      </button>

      {menueopen && 
      <div
      className="absolute right-0 bottom-0 mt-2  z-10  bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-40 dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Reply
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Forward
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
              Copy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
              Report
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
              Delete
            </a>
          </li>
        </ul>
      </div>
            }
    </div>
  );
}
