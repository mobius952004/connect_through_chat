import React from 'react';
import { IoCallOutline, IoVideocamOutline, IoArrowDown, IoArrowUp } from "react-icons/io5";

export default function CallHistoryItem({ user, type, date, time }) {
    // Determine icon and color based on call type
    const getCallStatusIcon = () => {
        switch (type) {
            case 'incoming':
                return <IoArrowDown className="text-red-500" size={12} />; // Missed/Incoming often red if missed, lets assume missed for now or generic
            case 'outgoing':
                return <IoArrowUp className="text-green-500" size={12} />;
            case 'missed':
                return <IoArrowDown className="text-red-500" size={12} />;
            default:
                return <IoArrowDown className="text-green-500" size={12} />;
        }
    };

    return (
        <div className="flex items-center justify-between p-3 hover:bg-[#202c33] cursor-pointer transition-colors group rounded-lg mx-2">
            <div className="flex items-center gap-4 flex-1">
                {/* Avatar */}
                <div className="relative">
                    <img
                        src={user?.profileImage || "/persondp.png"}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex flex-col">
                    <h3 className="text-gray-100 font-medium text-[17px]">{user?.username || "Unknown User"}</h3>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                        {getCallStatusIcon()}
                        <span>{date}, {time}</span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <button className="p-2 text-[#00a884] hover:bg-[#2a3942] rounded-full transition-colors z-10">
                <IoCallOutline size={22} />
            </button>
        </div>
    );
}
