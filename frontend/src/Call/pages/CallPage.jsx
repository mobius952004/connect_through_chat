 import React, { useContext } from 'react';
import { ChatContext } from '../../store/socketContext';
import CallHistoryItem from '../components/CallHistoryItem';
import CallActions from '../components/CallActions';
import ContactList from '../components/ContactList';
import { IoSearch } from "react-icons/io5";

export default function CallPage() {
    const { chatlist, getCurrentUser } = useContext(ChatContext);
    const currentUser = getCurrentUser();

    // Simulate call history logic (same as before)
    const recentCalls = chatlist?.slice(0, 15).map((chat, index) => {
        const otherUser = chat.users?.find(u => u._id !== currentUser?.userId) || chat.users?.[0] || { username: "Unknown" };

        return {
            _id: chat._id,
            user: otherUser,
            type: index % 3 === 0 ? 'missed' : (index % 2 === 0 ? 'incoming' : 'outgoing'),
            date: 'Today',
            time: `${10 + index}:30 AM`
        };
    }) || [];

    return (
        <div className="flex flex-col h-full w-full bg-[#0b141a] text-gray-200 font-sans overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 bg-[#111b21] border-b border-gray-800 shrink-0">
                <h1 className="text-2xl font-bold text-gray-100">Calls</h1>
                <div className="flex items-center gap-4 text-gray-400">
                    <button className="hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white/5">
                        <IoSearch size={20} />
                    </button>
                    {/* <button className="hover:text-gray-200 transition-colors">
                        <IoCall size={20} />
                    </button> */}
                </div>
            </div>

            {/* Main Content Area - Split Layout */}
            <div className="flex flex-1 overflow-hidden">

                {/* Left Column: Call History (Flexible width, takes priority) */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 border-r border-gray-800 bg-[#111b21]">
                    <h2 className="px-6 py-4 text-[15px] font-medium text-emerald-500 sticky top-0 bg-[#111b21] z-10">Recent</h2>
                    <div className="pb-4 px-2">
                        {recentCalls.length > 0 ? (
                            recentCalls.map((call, index) => (
                                <CallHistoryItem
                                    key={index}
                                    user={call.user}
                                    type={call.type}
                                    date={call.date}
                                    time={call.time}
                                />
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-center opacity-60">
                                <p className="text-gray-400">No recent calls</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Sidebar (Fixed width on Desktop, hidden or adapted on mobile if needed, but for now we show it as a persistent sidebar for 'enhanced' UI) */}
                {/* On mobile, this might be better as a bottom sheet or separate tab, but 'responsive' requirement usually suggests stacking or hiding. 
                    Given the request for "too plain", showing this on the side fills the space well on desktop. 
                    For mobile we hide it or stack it? Let's hide on very small screens and show on md+ for now, or stack. 
                    Actually, let's keep it visible on md+ and maybe stack on generic mobile if needed, but standard whatsapp is tabs. 
                    Let's make it a Sidebar for MD+ screens. 
                */}
                <div className="hidden md:flex flex-col w-[320px] lg:w-[360px] bg-[#0b141a] p-4 gap-4 overflow-y-auto">
                    <CallActions />
                    <ContactList />
                </div>

            </div>

        </div>
    );
}
