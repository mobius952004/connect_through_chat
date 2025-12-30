import { EllipsisVerticalIcon } from "lucide-react";
import { useEffect } from "react";
import { useRef } from "react";
// import "flowbite";
import { useState } from "react";

export default function PrevChat({ msg }) {

  const menueRef = useRef(null)
  const [menueopen, setmenueopen] = useState(false)
  // console.log(msg)

  useEffect(() => {

    const outsideclick = (e) => {
      if (menueRef.current && !menueRef.current.contains(e.target)) { setmenueopen(false) }
    }

    document.addEventListener("mousedown", outsideclick);
    return () => document.removeEventListener("mousedown", outsideclick);
  }, [menueRef])

  return (
    <div className={`flex my-2 items-start gap-2.5 group relative  ${msg.belongstouser ? "self-end flex-row-reverse" : "self-start flex-row"}`} ref={menueRef}>
      <img className="w-8 h-8 rounded-full" src="/persondp.png" alt="Jese image" />
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className={` flex items-center ${msg.belongstouser ? "justify-start flex-row-reverse space-x-reverse gap-4" : "gap-2"}`}>
          <span className="text-sm font-semibold text-emerald-300 dark:text-emerald-100">
            {msg.from.username ||msg.fromName}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {msg.time}
          </span>
        </div>
        <div className={`flex flex-col flex-wrap leading-1.5 p-4 border-gray-200 bg-gray-100   ${msg.belongstouser ? "bg-gray-600 rounded-s-xl rounded-ee-xl" : "dark:bg-green-600 rounded-e-xl rounded-es-xl"} `}>
          <p className="text-sm font-normal  text-gray-900 dark:text-white whitespace-pre-wrap break-all">
            {msg.content}
          </p>
        </div>
        <div className={` flex items-center ${msg.belongstouser ? "justify-start flex-row-reverse space-x-reverse gap-4" : "gap-2"}`}>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ">
            {msg.status}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ">
            {msg.date}
          </span>

        </div>
      </div>
      <button

        className={`  inline-flex self-center items-center  p-2 text-sm font-medium text-center text-gray-900 rounded-lg focus:ring-0 focus:outline-none dark:text-white opacity-0 group-hover:opacity-100`}
        type="button"
        onClick={() => setmenueopen(!menueopen)}

      >
        <EllipsisVerticalIcon />
      </button>

      {menueopen &&
        <div
          className={`absolute ${msg.belongstouser?"right-40":"left-0" }   bottom-15 mt-0  z-10  bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-40 dark:bg-gray-700 dark:divide-gray-600`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
          >
            <li>
              <button
                type="button" className="w-full block px-4 py-2 text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Reply
              </button>
            </li>
            <li>
              <button
               type="button" className="w-full block px-4 py-2 text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Forward
              </button>
            </li>
            <li>
              <button
               type="button" className="w-full block px-4 py-2 text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Copy
              </button>
            </li>
            <li>
              <button
                type="button" className="w-full block px-4 py-2 text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                pin
              </button>

            </li>
            <li>
               <button
                type="button" className="w-full block px-4 py-2 text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      }
    </div>
  );
}
