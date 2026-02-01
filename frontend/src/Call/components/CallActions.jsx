import React from 'react';
import { IoCall, IoPeople, IoLink } from "react-icons/io5";

export default function CallActions() {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-gray-400 font-medium text-sm px-2">Quick Actions</h3>

            <div className="grid grid-cols-2 gap-3">
                <ActionButton
                    icon={<IoCall size={22} />}
                    label="New Call"
                    color="bg-emerald-600 hover:bg-emerald-700"
                />
                <ActionButton
                    icon={<IoPeople size={22} />}
                    label="Group Call"
                    color="bg-gray-800 hover:bg-gray-700"
                />
            </div>

            <button className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#202c33] transition-colors text-left group border border-gray-800 bg-[#111b21]">
                <div className="w-10 h-10 rounded-full bg-[#00a884]/20 flex items-center justify-center text-[#00a884] group-hover:bg-[#00a884] group-hover:text-black transition-all">
                    <IoLink size={20} className="rotate-[-45deg]" />
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-200 font-medium">Create call link</span>
                    <span className="text-gray-500 text-xs">Share a link for your WhatsApp call</span>
                </div>
            </button>
        </div>
    );
}

function ActionButton({ icon, label, color }) {
    return (
        <button className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all ${color} text-white shadow-sm`}>
            <div className="p-2 rounded-full bg-white/10">
                {icon}
            </div>
            <span className="font-medium text-sm">{label}</span>
        </button>
    )
}
