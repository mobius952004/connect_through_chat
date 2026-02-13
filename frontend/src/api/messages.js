const API_BASE = import.meta.env.VITE_API_BASE_URL;
import { fetchWithAuth } from "./fetchWithAuth";



export async function deleteMessage({chatId,messageId}){

 const res = await fetchWithAuth(`${API_BASE}/api/messages/delete/${chatId}`,{
method:"POST",
body:JSON.stringify({messageId})
 })


 return res.json()

}