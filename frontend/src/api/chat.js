const API_BASE = import.meta.env.VITE_API_BASE_URL;
import { fetchWithAuth } from "./fetchWithAuth";



export async function setChatList({ selecteduserId, selectedusername }) {

  const res = await fetchWithAuth(`${API_BASE}/api/chat/setChatList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      selecteduserId,
      selectedusername,
    })

  })
  return res.json();
}
//
//
//
export async function getChatList() {
  const res = await fetchWithAuth(`${API_BASE}/api/chat/getChatList`, {
    method: "GET",

  })
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Chat list getting error");
  }

  return data;
}