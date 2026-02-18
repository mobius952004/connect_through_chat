import { useContext } from "react";
import { ChatContext } from "../../store/socketContext";
import { PersonStandingIcon } from "lucide-react";

export default function UserGroupCard({ chat }) {
  const { getCurrentUser, createGroup,setCreateGroup} = useContext(ChatContext);

  if (!chat) return null; // guard against undefined
  // console.log(user)
  const UserId = getCurrentUser().userId;
  const otheruser = chat?.users.find(u => u._id !== UserId);

  const isSelected = createGroup.includes(chat._id);

  const toggleSelection = () => {
    if (isSelected) {
      setCreateGroup(prev => prev.filter(id => id !== chat._id));
    } else {
      setCreateGroup(prev => [...prev, chat._id]);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleSelection}
      className={`w-full rounded-2xl p-2 transition-colors ${isSelected ? "bg-emerald-900/50 border border-emerald-500" : "hover:bg-slate-800"}`}
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
              {otheruser.username || "Unknown"}
            </p>
            <p className="font-medium dark:text-zinc-400 text-gray-500">
              {chat.lastmessage || "yorushukuonegaishimasu "}
            </p>
          </div>
        </div>

        {isSelected && (
          <div className="text-emerald-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
        )}


      </div>
    </button>
  );
}
