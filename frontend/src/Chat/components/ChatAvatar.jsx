

export default function ChatAvatar(){

    return (
        <div className="flex items-center gap-4 bg-gray-700 w-full py-1   mt-2">
    <img className="w-10 h-10 rounded-full" src="vite.svg" alt=""/>
    <div className="font-medium dark:text-white">
        <div>Jese Leos</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
    </div>
</div>
    )
}