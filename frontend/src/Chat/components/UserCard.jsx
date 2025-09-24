import { useContext } from "react";
import { ChatContext } from "../../store/socketContext";
import { PersonStandingIcon } from "lucide-react";

export default function UserCard({ user }) {
  const { setselecteduser } = useContext(ChatContext);

  if (!user) return null; // guard against undefined
  // console.log(user)
  return (
    <button
      type="button"
      onClick={() => {
        setselecteduser(user);
      }}
      className=" w-full  bg-gray-800  hover:bg-slate-700  m-0.5 rounded-2xl hover:border-emerald-100 border-1"
    >
      <div className="flex flex-row gap-4 px-3 sm:flex-row items-center sm:gap-6 sm:py-1 ... ">
        <img
          className="mx-2 block h-12 rounded-full sm:mx-0 items-center bg-slate-800 sm:shrink-0"
          src="/vite.svg"
          alt={<PersonStandingIcon />}
        />
        <div className=" flex-1 text-left sm:text-left items-center">
          <div className="space-y-0">
            <p className="text-lg font-semibold dark:text-zinc-300 text-zinc-800">
              {user.username || "Unknown"}
            </p>
            <p className="font-medium dark:text-zinc-400 text-gray-500">
              {user.status || "hey "}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
