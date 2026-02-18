import React, { useContext } from "react";
import { ChatContext } from "../../store/socketContext";
import {
    IoClose,
    IoPencil,
    IoSearchOutline,
    IoVideocamOutline,
    IoCallOutline,
    IoChevronForward,
    IoDocumentTextOutline,
    IoStarOutline,
    IoNotificationsOutline,
    IoTimerOutline
} from "react-icons/io5";

export default function UserInfoPanel() {
    const { setsidepanel, selectedChat, getCurrentUser } = useContext(ChatContext);

    // Safety check
    if (!selectedChat) return null;

    const currentUserId = getCurrentUser()?.userId;
    const user = selectedChat.users.find(u => u._id !== currentUserId) || {};

    return (
        <div className="h-full w-full flex flex-col bg-[#111b21] text-gray-200 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 font-sans">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#111b21] sticky top-0 z-10">
                <button
                    onClick={() => setsidepanel(null)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                    <IoClose size={24} />
                </button>
                <h2 className="text-[17px] font-medium text-white flex-1 ml-6">Contact info</h2>
                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                    <IoPencil size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pb-10">
                {/* Profile Section */}
                <div className="flex flex-col items-center py-8 px-4 bg-[#111b21]">
                    <div className="w-40 h-40 rounded-full overflow-hidden mb-4 relative group cursor-pointer bg-gray-800">
                        <img
                            src={user.profileImage || "/persondp.png"}
                            alt={user.username}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <h1 className="text-2xl font-normal text-gray-100 mb-1">{user.username || "Unknown"}</h1>
                    <p className="text-lg text-gray-500 font-normal">{user.status}</p>  {/* Placeholder/Static as per requirement/image */}
                </div>

                {/* Quick Actions Row */}
                <div className="flex items-center justify-center gap-4 px-4 pb-6 bg-[#111b21]">
                    <ActionButton icon={<IoSearchOutline size={22} />} label="Search" />
                    <ActionButton icon={<IoVideocamOutline size={22} />} label="Video" />
                    <ActionButton icon={<IoCallOutline size={20} />} label="Voice" />
                </div>

                {/* About Section */}
                <div className="px-6 py-4 bg-[#111b21] relative mb-2">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">About</h3>
                    <p className="text-gray-100 text-[16px]">connect.</p>
                </div>

                {/* Divider */}
                <div className="h-[8px] bg-[#0b141a] w-full border-t border-b border-[#222d34]"></div>


                {/* Media, Links & Docs Section */}
                <div className="bg-[#111b21] pt-4">
                    <button className="w-full flex items-center justify-between px-6 py-2 hover:bg-[#202c33] transition-colors group">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400"><IoDocumentTextOutline size={22} /></span>
                            <span className="text-gray-200 font-medium">Media, links and docs</span>
                        </div>
                        <div className="flex items-center text-gray-500 group-hover:text-gray-300">
                            <IoChevronForward size={18} />
                        </div>
                    </button>

                    {/* Horizontal Scrollable Thumbnails */}
                    <div className="flex gap-2 px-6 py-4 overflow-x-auto scrollbar-hide">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex-shrink-0 w-24 h-24 bg-[#202c33] rounded-lg overflow-hidden border border-[#222d34] relative">
                                <div className="absolute inset-0 flex items-center justify-center text-xs text-center text-gray-500 p-2">
                                    Media Preview {i}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-[8px] bg-[#0b141a] w-full border-t border-b border-[#222d34]"></div>


                {/* Additional Options List */}
                <div className="bg-[#111b21] pt-2">
                    <OptionItem icon={<IoStarOutline size={22} />} title="Starred messages" />
                    <OptionItem icon={<IoNotificationsOutline size={22} />} title="Notification settings" />
                    <OptionItem icon={<IoTimerOutline size={22} />} title="Disappearing messages" subtitle="Off" />
                </div>
            </div>
        </div>
    );
}

function ActionButton({ icon, label }) {
    return (
        <button className="flex flex-col items-center justify-center w-[100px] h-[70px] rounded-xl border border-[#222d34] text-[#00a884] hover:bg-[#202c33] hover:border-[#2a3942] transition-all duration-200 active:scale-95">
            <div className="mb-1">{icon}</div>
            <span className="text-sm font-medium">{label}</span>
        </button>
    )
}

function OptionItem({ icon, title, subtitle }) {
    return (
        <button className="w-full flex items-center gap-6 px-6 py-4 hover:bg-[#202c33] transition-colors text-left group">
            <div className="text-gray-400 group-hover:text-gray-300 min-w-[24px]">{icon}</div>
            <div className="flex-1">
                <h4 className="text-gray-200 text-[16px] font-normal">{title}</h4>
                {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
        </button>
    )
}
