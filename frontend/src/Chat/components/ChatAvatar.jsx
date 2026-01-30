import { IoArrowBack, IoCallOutline, IoVideocamOutline, IoSearchOutline, IoEllipsisVertical } from "react-icons/io5";
import { useContext, useState, useRef, useEffect } from "react";
import { ChatContext } from "../../store/socketContext";

export default function ChatAvatar({ UserId }) {
    const { setsidepanel, selectedChat, setSelectedChat } = useContext(ChatContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    if (!selectedChat) return null
    const otheruser = selectedChat.users.find(u => u._id !== UserId);

    return (
        <div className="flex items-center justify-between bg-gray-950 w-full py-2 px-4 border-b border-gray-800 relative shadow-sm">
            {/* Left Section: Back Button + User Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                    type="button"
                    onClick={() => setSelectedChat(null)}
                    className="md:hidden text-gray-300 hover:text-white transition-colors"
                >
                    <IoArrowBack size={24} />
                </button>

                <button
                    type="button"
                    onClick={() => setsidepanel("UserInfo")}
                    className="flex items-center gap-3 flex-1 min-w-0 text-left group"
                >
                    <img className="w-10 h-10 rounded-full object-cover" src="/persondp.png" alt="" />
                    <div className="font-medium text-white truncate">
                        <div className="truncate group-hover:underline decoration-gray-500 underline-offset-2">{otheruser.username}</div>
                        <div className="text-xs text-gray-400 truncate">Click for contact info</div>
                    </div>
                </button>
            </div>

            {/* Right Section: Call Actions + Menu */}
            <div className="flex items-center gap-4 text-emerald-400">
                <button className="p-2 hover:bg-gray-800 rounded-full transition-all hidden sm:block tooltip-target" title="Video Call">
                    <IoVideocamOutline size={22} />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-full transition-all hidden sm:block delay-75" title="Voice Call">
                    <IoCallOutline size={20} />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-full transition-all border-l border-gray-800 pl-4 ml-1" title="Search">
                    <IoSearchOutline size={20} />
                </button>

                {/* Custom Dropdown Menu */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`p-2 rounded-full transition-all ${isMenuOpen ? 'bg-gray-800 text-emerald-300' : 'hover:bg-gray-800'}`}
                    >
                        <IoEllipsisVertical size={20} />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 py-2 animate-in fade-in zoom-in-95 duration-100">
                            {[
                                "Contact info",
                                "Select messages",
                                "Mute notifications",
                                "Disappearing messages",
                                "Add to favourites",
                                "Close chat",
                                "Report",
                                "Block",
                                "Clear chat",
                                "Delete chat"
                            ].map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        console.log(`Clicked: ${item}`);
                                        setIsMenuOpen(false);
                                        if (item === "Contact info") setsidepanel("UserInfo");
                                        if (item === "Close chat") setSelectedChat(null);
                                    }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors flex items-center gap-3"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}