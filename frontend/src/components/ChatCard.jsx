export default function ChatCard() {

    return (

        
        
            <button className="w-full bg-slate-700  hover:bg-slate-800 rounded-2xl my-1 ">
        <div className="flex flex-row gap-4 px-3 sm:flex-row items-center sm:gap-6 sm:py-1 ... ">
            <img className="mx-2 block h-12 rounded-full sm:mx-0 items-center bg-slate-400 sm:shrink-0" src="/vite.svg" alt="" />
            <div className=" flex-1 text-left sm:text-left items-center">
                <div className="space-y-0">
                    <p className="text-lg font-semibold text-zinc-500">Erin Lindford</p>
                    <p className="font-medium text-gray-500">Product Engineer</p>
                </div>

            </div>
        </div>
        </button>
    )

}