import { EllipsisVerticalIcon } from "lucide-react";
import { useEffect, useRef, useState, useContext } from "react";
import { ChatContext } from "../../store/socketContext";

export default function PrevChat({ msg }) {
  const { selectedChat } = useContext(ChatContext);
  const menueRef = useRef(null);
  const buttonRef = useRef(null);
  const [menueopen, setmenueopen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const isGroup = selectedChat?.users?.length > 2;
  const isUser = msg.belongstouser;

  useEffect(() => {
    const outsideclick = (e) => {
      if (menueRef.current && !menueRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
        setmenueopen(false);
      }
    };
    document.addEventListener("mousedown", outsideclick);
    window.addEventListener("scroll", () => setmenueopen(false), true);
    return () => {
      document.removeEventListener("mousedown", outsideclick);
      window.removeEventListener("scroll", () => setmenueopen(false), true);
    };
  }, []);

  const toggleMenu = () => {
    if (!menueopen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;

      let top = rect.bottom;
      let left = rect.left;

      if (top + 200 > screenHeight) top = rect.top - 200;
      if (left + 160 > screenWidth) left = screenWidth - 170;

      setMenuPos({ top, left });
    }
    setmenueopen(!menueopen);
  };

  const StatusIndicator = ({ status }) => {
    if (status === "Read") {
      // 2 overlapping green dots
      return (
        <div className="flex relative w-4 h-3 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute left-0"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute left-1 border-l border-emerald-700"></div>
        </div>
      );
    } else if (status === "Delivered") {
      // 2 slightly overlapping gray dots
      return (
        <div className="flex relative w-4 h-3 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 absolute left-0"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 absolute left-1 border-l border-gray-800"></div>
        </div>
      );
    } else {
      // Sent (Pending/Sent) - 1 bold dot
      return <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>;
    }
  };

  return (
    <div className={`flex my-2.5 items-end gap-2 group relative w-full ${isUser ? "flex-row-reverse" : "flex-row"}`}>

      {/* Avatar - Only show for OTHER users in GROUP chats */}
      {!isUser && isGroup && (
        <img className="w-8 h-8 rounded-full mb-1" src="/persondp.png" alt="User" />
      )}

      {/* Message Bubble */}
      <div className={`relative flex flex-col px-3 py-1.5 shadow-md pb-5 min-w-[100px] max-w-[85%] md:max-w-[70%] ${isUser
          ? "bg-emerald-700 rounded-l-xl rounded-tr-xl rounded-br-none text-white"
          : "bg-gray-800 rounded-r-xl rounded-tl-xl rounded-bl-none text-gray-100"
        }`}>

        {/* Sender Name */}
        {!isUser && isGroup && (
          <span className="text-xs font-bold text-emerald-400 mb-1 leading-tight">
            {msg.from.username || msg.fromName}
          </span>
        )}

        {/* Content */}
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {msg.content}
        </p>

        {/* Metadata (Time & Status) */}
        <div className="absolute bottom-1 right-2 flex items-center gap-1 select-none">
          <span className="text-[10px] text-gray-300 opacity-80">
            {msg.time}
          </span>
          {/* Status Indicator logic swapped as requested: Show on Receiver bubble (!isUser), Hide on User bubble (isUser) */}
          {!isUser && <StatusIndicator status={msg.status} />}
        </div>
      </div>

      {/* Menu Trigger - Always Visible (Permanent) as requested */}
      <button
        ref={buttonRef}
        className="opacity-100 text-gray-500 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
        onClick={toggleMenu}
      >
        <EllipsisVerticalIcon size={20} />
      </button>

      {/* Menu */}
      {menueopen && (
        <div
          ref={menueRef}
          style={{ top: menuPos.top, left: menuPos.left }}
          className="fixed z-50 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-xl divide-y divide-gray-700 animate-in fade-in zoom-in-95 duration-100"
        >
          <ul className="py-1 text-sm text-gray-200">
            {['Reply', 'Forward', 'Copy', 'Pin', 'Delete'].map((action) => (
              <li key={action}>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 transition flex items-center gap-2"
                  onClick={() => { console.log(action); setmenueopen(false); }}
                >
                  {action}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
