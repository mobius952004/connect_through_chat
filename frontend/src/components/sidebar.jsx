import { CgProfile } from "react-icons/cg";
import { CgRemote } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineLightMode } from "react-icons/md";
import { PiGlobeStandDuotone } from "react-icons/pi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../store/socketContext";
import { HomeIcon } from "lucide-react";
import { useContext } from "react";


export default function Sidebar() {

    //  const{username}=useParams()
    const navigate = useNavigate()


    // const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { selectedChat ,unreadcounts} = useContext(ChatContext);
    // const {dopost,setdopost} = useContext(Postlist)

    return (
        <div className={`bg-gray-950 relative overflow-visible w-14 sm:w-10 md:w-16 ${selectedChat ? "hidden md:block" : "block"}`} >

            <aside className="my-auto py-2 sm:py-4 md:py-5 h-full">

                <div className="flex flex-col justify-between h-full ">

                    <div className="flex flex-col items-center w-14 sm:w-10 md:w-16">

                        {/* <div className="relative group sm:my-2 my-1">
                            <button className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {isMenuOpen ? <IoCloseSharp className="sm:w-7 sm:h-9 w-6 h-8 text-white hover:text-green-600 transition-all transform hover:scale-[1.1] cursor-pointer" /> : <IoMenu className="sm:w-7 sm:h-9 w-6 h-8 text-white hover:text-green-600 transition-all transform hover:scale-[1.1] cursor-pointer" />
                                }
                            </button>

                            <span className="hidden md:block absolute bottom-full mb-1 left-1/2 -translate-x-1/4 px-2 py-1 bg-gray-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100  pointer-events-none whitespace-nowrap z-50">
                                {isMenuOpen ? "Close Menus" : "Open Menu"}
                            </span>
                            {/* {isMenuOpen &&<Drawer/>} */}
                        {/* </div>  */}
                        

                        <div className="relative group sm:my-2 my-1">
                            <button className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors" onClick={() => navigate(`/connect/home`)} >
                                <HomeIcon className="sm:w-7 sm:h-7 w-6 h-6 text-white hover:text-green-600 transition-all transform hover:scale-[1.1] cursor-pointer" />
                            </button>

                            <span className="hidden md:block absolute bottom-full mb-1 left-1/2 -translate-x-1/4 px-2 py-1 bg-gray-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100  pointer-events-none whitespace-nowrap z-50">
                                Home
                            </span>
                        </div>
                        <div className="relative group sm:my-2 my-1">
                            <button className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors" onClick={() => navigate(`/connect/home/chats`)} >
                             {unreadcounts && <label className="bg-green-500 rounded-full h-2 w-2 m-0 p-1">
                                unreadcount()
                                </label>}
                                <IoChatboxEllipsesOutline className="sm:w-7 sm:h-7 w-6 h-6 text-white hover:text-green-600 transition-all transform hover:scale-[1.1] cursor-pointer" />
                            </button>

                            <span className="hidden md:block absolute bottom-full mb-1 left-1/2 -translate-x-1/4 px-2 py-1 bg-gray-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100  pointer-events-none whitespace-nowrap z-50">
                                Chats
                            </span>
                        </div>
                        <div className="relative group sm:my-2 my-1">
                            <button className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors"
                                onClick={() => navigate(`/connect/home/calls`)}>
                                <IoCallOutline className="sm:w-7 sm:h-7 w-6 h-6 text-white hover:text-green-600 transition-all transform hover:scale-[1.1] cursor-pointer" />
                            </button>

                            <span className="hidden md:block absolute bottom-full mb-1 left-1/2 -translate-x-1/4 px-2 py-1 bg-gray-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none whitespace-nowrap z-50">
                                Calls
                            </span>
                        </div>
                        <div className="relative group sm:my-2 my-1">
                            <button className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors">
                                <PiGlobeStandDuotone className="sm:w-7 sm:h-7 w-6 h-6 text-white hover:text-green-600 transition-all transform hover:scale-[1.1] cursor-pointer" />
                            </button>

                            <span className="hidden md:block absolute bottom-full mb-1 left-1/2 -translate-x-1/4 px-2 py-1 bg-gray-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none whitespace-nowrap z-50">
                                Community
                            </span>
                        </div>
                        <div className="relative group sm:my-2 my-1">
                            <button className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors">
                                <CgRemote className="sm:w-7 sm:h-7 w-6 h-6 text-white hover:text-green-600 transition-all transform hover:scale-[1.1] cursor-pointer" />
                            </button>

                            <span className="hidden md:block absolute bottom-full mb-1 left-1/2 -translate-x-1/4 px-2 py-1 bg-gray-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none whitespace-nowrap z-50">
                                Channels
                            </span>
                        </div>


                    </div>
                    <div className="flex flex-col items-center w-14 md:w-16">



                        <div className="relative group sm:my-2 my-1">
                            <button className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors">
                                <MdOutlineLightMode className="sm:w-7 sm:h-7 w-6 h-6 text-white hover:text-green-600 transition-all transform hover:scale-[1.1] cursor-pointer" />
                            </button>

                            <span className="hidden md:block absolute bottom-full mb-1 left-1/2 -translate-x-1/4 px-2 py-1 bg-gray-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none whitespace-nowrap z-50">
                                Light Mode
                            </span>
                        </div>


                        <div className="relative group sm:my-2 my-1">
                            <button className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors"  onClick={() => navigate(`/connect/home/profile`)}>

                                <CgProfile className="sm:w-7 sm:h-7 w-6 h-6 text-white hover:text-green-600 transition-all transform hover:scale-[1.1] cursor-pointer" />
                            </button>

                            <span className="hidden md:block absolute bottom-full mb-1 left-1/2 -translate-x-1/4 px-2 py-1 bg-gray-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none whitespace-nowrap z-50">
                                Profile
                            </span>
                        </div>
                        <div className="relative group sm:my-2 my-1">
                            <button className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors">
                                <IoIosSettings className="sm:w-7 sm:h-7 w-6 h-6 text-white hover:text-green-600 transition-all transform hover:scale-[1.1] cursor-pointer" />
                            </button>

                            <span className="hidden md:block absolute bottom-full mb-1 left-1/2 -translate-x-1/4 px-2 py-1 bg-gray-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none whitespace-nowrap z-50">
                                Settings
                            </span>
                        </div>
                    </div>
                </div>


            </aside>

        </div>

    )

}
