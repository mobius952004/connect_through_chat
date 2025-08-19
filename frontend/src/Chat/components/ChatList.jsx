import ChatCard from "./ChatCard"

export default function ChatList(){


    return (
                <div className="flex-1 min-h-0 overflow-y-scroll scrollbar-hide">

                            {[1,2,3,4,5,6,7,8,9,1,2,34,5,6,7,8,9].map((user) => (
                                    <ChatCard user={user} key={user._id} />
                                    
                                ))}


                </div>

    )
}