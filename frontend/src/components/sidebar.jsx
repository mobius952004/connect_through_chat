// import { CgProfile } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { CgRemote } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineLightMode } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineAddCircle } from "react-icons/md";
import { PiGlobeStandDuotone } from "react-icons/pi";
import { useState } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
// import { MessageCircle, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Sidebar() {

//  const{username}=useParams()
const navigate=useNavigate()


    const [isMenueOpen, setIsMenusOpen] = useState(false)
    // const {dopost,setdopost} = useContext(Postlist)

    return (
        <div className="bg-gradient-to-t from-gray-900 via-gray-600 to-gray-900  relative overflow-visible  w-8" >
            {/* <div className="absolute inset-0 bg-gradient-to-t from-green-900/5 via-transparent to-emerald-900/5 pointer-events-none"></div> */}
            <aside className="     my-auto py-3 sm:py-4 lg:py-5 h-full">

                <div className="flex flex-col justify-between h-full ">

                    <div className="flex flex-col items-center  w-8">
                        {/* <button title="Profile" className="sm:my-2 my-1 relative">
                            <IoLogoWechat className="sm:w-5 sm:h-7 w-4 h-6 text-white hover:text-green-600 transition-all transform  hover:scale-[1.2]cursor-pointer " />
                        </button> */}
                        <div className="relative group sm:my-2 my-1">
                            <button className="relative " onClick={() => setIsMenusOpen(!isMenueOpen)}>
                                {isMenueOpen ? <IoCloseSharp className="sm:w-5 sm:h-7 w-4 h-6 text-white hover:text-green-600 transition-all transform hover:scale-[1.2] cursor-pointer " /> : <IoMenu className="sm:w-5 sm:h-7 w-4 h-6 text-white hover:text-green-600 transition-all transform hover:scale-[1.2] cursor-pointer " />
                                }
                            </button>

                            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/4 px-2 py-1 bg-gray-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100  pointer-events-none whitespace-nowrap z-50">
                                {isMenueOpen ? "Close Menus" : "Open Menu"}
                            </span>
                        </div>
                        <div className="relative group sm:my-2 my-1">
                            <button className="relative" onClick={() => navigate(`/connect/home/chats`)} >
                                <IoChatboxEllipsesOutline className="sm:w-5 sm:h-7 w-4 h-6 text-white hover:text-green-600 transition-all transform hover:scale-[1.2] cursor-pointer" />
                            </button>

                            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/4 px-2 py-1 bg-gray-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100  pointer-events-none whitespace-nowrap z-50">
                                Chats
                            </span>
                        </div>
                        <div className="relative group sm:my-2 my-1">
                            <button className="relative" 
                            onClick={()=>navigate(`/connect/home/calls`)}>
                                <IoCallOutline className="sm:w-5 sm:h-7 w-4 h-6 text-white hover:text-green-600 transition-all transform hover:scale-[1.2] cursor-pointer"  />
                            </button>

                            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/4 px-2 py-1 bg-gray-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none whitespace-nowrap z-50">
                                Calls
                            </span>
                        </div>
                        <div className="relative group sm:my-2 my-1">
                            <button className="relative">
                                <PiGlobeStandDuotone className="sm:w-5 sm:h-7 w-4 h-6 text-white hover:text-green-600 transition-all transform hover:scale-[1.2] cursor-pointer" />
                            </button>

                            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/4 px-2 py-1 bg-gray-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none whitespace-nowrap z-50">
                                Community
                            </span>
                        </div>
                        <div className="relative group sm:my-2 my-1">
                            <button className="relative">
                                <CgRemote className="sm:w-5 sm:h-7 w-4 h-6 text-white hover:text-green-600 transition-all transform hover:scale-[1.2] cursor-pointer" />
                            </button>

                            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/4 px-2 py-1 bg-gray-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none whitespace-nowrap z-50">
                                Channels
                            </span>
                        </div>


                    </div>
                    <div className="flex flex-col items-center  w-8">



                        <div className="relative group sm:my-2 my-1">
                            <button className="relative">
                                <MdOutlineLightMode className="sm:w-5 sm:h-7 w-4 h-6 text-white hover:text-green-600 transition-all transform hover:scale-[1.2] cursor-pointer" />
                            </button>

                            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/4 px-2 py-1 bg-gray-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none whitespace-nowrap z-50">
                                Light Mode
                            </span>
                        </div>


                        <div className="relative group sm:my-2 my-1">
                            <button className="relative">
                                <IoIosSettings className="sm:w-5 sm:h-7 w-4 h-6 text-white hover:text-green-600 transition-all transform hover:scale-[1.2] cursor-pointer" />
                            </button>

                            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/4 px-2 py-1 bg-gray-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none whitespace-nowrap z-50">
                                Settings
                            </span>
                        </div>
                    </div>
                </div>


            </aside>

        </div>

    )

}
