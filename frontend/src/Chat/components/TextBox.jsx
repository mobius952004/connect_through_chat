import { Send, SmileIcon, PlusIcon, FileText, Image, Camera } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";

export default function TextBox({ textMessage, setTextMessage, sendmessage }) {
    const [showPicker, setShowPicker] = useState(false);
    const [showAttachMenu, setShowAttachMenu] = useState(false);
    const pickerRef = useRef(null);
    const attachRef = useRef(null);

    const onEmojiClick = (emojiObject) => {
        setTextMessage((prev) => prev + emojiObject.emoji);
    };

    const sendText = (e) => {
        e.preventDefault();
        if (!textMessage.trim()) return;

        sendmessage(textMessage);
        setTextMessage("");
        setShowPicker(false);
    };

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
            if (attachRef.current && !attachRef.current.contains(event.target)) {
                setShowAttachMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <div className="relative px-4 py-3 bg-[#f0f2f5] dark:bg-[#202c33] flex items-center gap-2">

            {/* Attachment Menu (Plus Icon) */}
            <div className="relative" ref={attachRef}>
                <button
                    type="button"
                    onClick={() => setShowAttachMenu(!showAttachMenu)}
                    className="p-2 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition-colors"
                >
                    <PlusIcon size={24} />
                </button>

                {showAttachMenu && (
                    <div className="absolute bottom-12 left-0 flex flex-col gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-200 z-50 min-w-[150px]">
                        <button className="flex items-center gap-3 p-2 hover:bg-gray-900 dark:hover:bg-gray-900 rounded-lg transition-colors text-gray-700 dark:text-gray-200">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-600 dark:text-purple-300">
                                <FileText size={20} />
                            </div>
                            <span className="text-sm font-medium">Document</span>
                        </button>
                        <button className="flex items-center gap-3 p-2 hover:bg-gray-900 dark:hover:bg-[#111b21] rounded-lg transition-colors text-gray-700 dark:text-gray-200">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300">
                                <Image size={20} />
                            </div>
                            <span className="text-sm font-medium">Photos</span>
                        </button>
                        <button className="flex items-center gap-3 p-2 hover:bg-gray-900 dark:hover:bg-[#111b21] rounded-lg transition-colors text-gray-700 dark:text-gray-200">
                            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full text-red-600 dark:text-red-300">
                                <Camera size={20} />
                            </div>
                            <span className="text-sm font-medium">Camera</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Emoji Picker Button */}
            <div className="relative" ref={pickerRef}>
                <button
                    type="button"
                    onClick={() => setShowPicker(!showPicker)}
                    className={`p-2 transition-colors ${showPicker ? "text-emerald-500" : "text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"}`}
                >
                    <SmileIcon size={24} />
                </button>

                {showPicker && (
                    <div className="absolute bottom-12 left-[-40px] z-50 shadow-2xl rounded-2xl overflow-y-scroll ">
                        <EmojiPicker
                            onEmojiClick={onEmojiClick}
                            theme={Theme.DARK}
                            width={500}
                            height={400}
                        />
                    </div>
                )}
            </div>

            {/* Input Field */}
            <form onSubmit={sendText} className="flex-1">
                <input
                    type="text"
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    placeholder="Type a message"
                    className="w-full py-2.5 px-4 bg-white dark:bg-gray-700 rounded-lg border-none focus:ring-0 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-[15px] outline-none"
                />
            </form>

            {/* Send Button */}
            <button
                onClick={sendText}
                disabled={!textMessage.trim()}
                className={`p-2.5 rounded-full transition-all duration-200 ${textMessage.trim()
                    ? "bg-emerald-500 text-slate900 dark:text-white hover:bg-emerald-600 shadow-sm"
                    : "text-zinc-400 dark:text-zinc-500 cursor-default"
                    }`}
            >
                <div className="pl-1">
                    <Send size={20} />
                </div>
            </button>
        </div>
    );
}
