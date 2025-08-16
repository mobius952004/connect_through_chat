import { Send, SmileIcon, Image } from "lucide-react";
import { useContext } from "react";
import { ChatContext } from "../../store/socketContext";

export default function TextBox({ textMessage, setTextMessage, sendmessage }) {

    const {socket}=useContext(ChatContext)
    const sendText = (e) => {
        e.preventDefault()
        if (!textMessage.trim()) {
            return;
        }
        console.log(textMessage);
        sendmessage(textMessage);
        setTextMessage("");
    };
socket.emit()
    

    return (
        <form onSubmit={(e) => {
            sendText(e);
            
        }}>
            <label htmlFor="chat" className="sr-only">
                Your message
            </label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                <button
                    type="button"
                    className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                    <Image />
                    <span className="sr-only">Upload image</span>
                </button>
                <button
                    type="button"
                    className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                    <SmileIcon />
                    <span className="sr-only">Add emoji</span>
                </button>
                <textarea
                    id="chat"
                    rows="1"
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder="Your message..."
                ></textarea>
                <button
                    type="submit"
                    className="inline-flex justify-center p-2 text-green-600 rounded-full cursor-pointer hover:bg-green-100 dark:text-green-500 dark:hover:bg-gray-600"
                >
                    <Send />
                    <span className="sr-only">Send message</span>
                </button>
            </div>
        </form>
    );
}
