import { useContext } from "react";
import { ChatContext } from "../../store/socketContext";
import { PersonStandingIcon } from "lucide-react";

export default function ChatCard({ chat }) {
  const { setSelectedChat, getCurrentUser, unreadCounts } = useContext(ChatContext);

  if (!chat) return null; // guard against undefined
  const UserId = getCurrentUser().userId;
  const otheruser = chat?.users.find(u => u._id !== UserId);

  // console.log(chat._id);
  // console.log(unreadCounts)
  // console.log(unreadCounts[chat._id]);

  return (
    <button
      type="button"
      onClick={() => {
        setSelectedChat(chat);
      }}
      className=" w-full bg-gradient-to-r from-bg-slate-700 via-bg-slate-800 to-bg-slate-700 hover:bg-slate-800 rounded-2xl p-2 "
    >
      <div className="flex flex-row gap-4 px-3 sm:flex-row items-center sm:gap-6 sm:py-1 ... ">
        <img
          className="mx-2 block h-12 rounded-full sm:mx-0 items-center bg-slate-400 sm:shrink-0"
          src="/persondp.png"
          alt={<PersonStandingIcon />}
        />
        <div className=" flex-1 text-left sm:text-left items-center">
          <div className="space-y-0">
            <p className="text-lg font-semibold dark:text-zinc-300 text-zinc-500">
              {chat.isGroup?chat.chatName:otheruser.username || "Unknown"}
            </p>
            <p className="font-medium dark:text-gray-200 text-gray-200 md:text-[12px] ">
              {chat.lastMessage?.content || "hey there i am using this app "}
            </p>
          </div>
        </div>

        {/* Unread Count Badge */}
        <div className="flex flex-col items-end justify-center">
          {unreadCounts[chat._id] > 0 && (
            <span className="bg-green-500 text-[#111b21] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCounts[chat._id]}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
