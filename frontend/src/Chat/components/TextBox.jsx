import { Send, SmileIcon, Image, SmilePlusIcon, SendHorizontalIcon } from "lucide-react";

export default function TextBox({ textMessage, setTextMessage, sendmessage }) {

    // const {setsidepanel}=useContext(ChatContext)
    const sendText = (e) => {
        e.preventDefault()
        if (!textMessage.trim()) {
            return;
        }
        // console.log(textMessage);
        sendmessage(textMessage);
        setTextMessage("");
    };
// socket.emit("Message",)
    

    return (
        <form onSubmit={(e) => {
            sendText(e);
            
        }}>
            <label htmlFor="chat" className="sr-only">
                Your message
            </label>
            <div className="flex items-center px-3 py-2  bg-gray-50 dark:bg-gray-800">
                <button
                    type="button"
                    className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-white dark:text-gray-400 "
                >
                    <Image />
                    {/* <LucideImage/> */}
                    <span className="sr-only">Upload image</span>
                </button>
                <button
                    type="button"
                    className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900  dark:text-gray-400 dark:hover:text-white "
                >
                    {/* <SmileIcon /> */}
                    <SmilePlusIcon/>
                    <span className="sr-only">Add emoji</span>
                </button>
                <textarea
                    id="chat"
                    rows="1"
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    onKeyDown={(event) => {
                        if(event.key == "Enter" &&  !event.shiftKey){
                            event.preventDefault();

                            if(textMessage.trim()) {
                                sendmessage(textMessage);
                                setTextMessage("")
                            }
                        }
                    }}
                    className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500  "
                    placeholder="Your message..."
                ></textarea>
                <button
                    type="submit"
                    className="inline-flex justify-center  text-green-600 dark:text-green-600 rounded-full cursor-pointer dark:hover:text-green-400 "
                >
                    <Send className="w-10 h-8"/>    
                    {/* <SendHorizontalIcon/> */}
                    <span className="sr-only">Send message</span>
                </button>
            </div>
        </form>
    );
}
