import React, { useContext, useState } from 'react';
import { ChatContext } from '../../store/socketContext';
import { IoCallOutline, IoVideocamOutline, IoSearchOutline } from "react-icons/io5";

export default function ContactList() {
    const { chatlist, getCurrentUser } = useContext(ChatContext);
    const currentUser = getCurrentUser();
    const [searchQuery, setSearchQuery] = useState("");

    // Filter contacts based on search
    const contacts = chatlist?.map(chat => {
        return chat.users?.find(u => u._id !== currentUser?.userId) || chat.users?.[0];
    }).filter(user => user && user.username?.toLowerCase().includes(searchQuery.toLowerCase())) || [];

    return (
        <div className="flex flex-col h-full bg-[#111b21] rounded-xl overflow-hidden border border-gray-800">
            <div className="p-4 border-b border-gray-800 bg-[#202c33]/50">
                <h3 className="text-gray-300 font-medium mb-3">Contacts</h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#111b21] text-gray-200 text-sm rounded-lg pl-9 pr-3 py-2 border border-gray-700 focus:outline-none focus:border-[#00a884] placeholder-gray-500"
                    />
                    <IoSearchOutline className="absolute left-3 top-2.5 text-gray-500" size={16} />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 p-2">
                {contacts.length > 0 ? (
                    contacts.map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-3 hover:bg-[#202c33] rounded-lg transition-colors group cursor-pointer">
                            <div className="flex items-center gap-3">
                                <img
                                    src={user.profileImage || "/persondp.png"}
                                    alt={user.username}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="text-gray-200 font-medium text-sm">{user.username}</h4>
                                    <p className="text-gray-500 text-xs truncate max-w-[120px]">{user.status || "Available"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-[#00a884] hover:bg-[#2a3942] rounded-full">
                                    <IoCallOutline size={18} />
                                </button>
                                <button className="p-2 text-[#00a884] hover:bg-[#2a3942] rounded-full">
                                    <IoVideocamOutline size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">
                        No contacts found
                    </div>
                )}
            </div>
        </div>
    );
}
