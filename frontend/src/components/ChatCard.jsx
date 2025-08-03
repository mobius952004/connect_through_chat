export default function ChatCard() {

    return (

        
        
            <button className="w-full  hover:bg-slate-800 ">
        <div className="flex flex-row gap-4 px-3 sm:flex-row items-center sm:gap-6 sm:py-1 ... ">
            <img className="mx-2 block h-12 rounded-full sm:mx-0 items-center bg-slate-400 sm:shrink-0" src="../../public/vite.svg" alt="" />
            <div className=" flex-1 text-left sm:text-left">
                <div className="space-y-0">
                    <p className="text-lg font-semibold text-black">Erin Lindford</p>
                    <p className="font-medium text-gray-500">Product Engineer</p>
                </div>
                <button className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">
                    Message
                </button>
            </div>
        </div>
        </button>
    )

}