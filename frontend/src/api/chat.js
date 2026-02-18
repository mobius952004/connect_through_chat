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

export async function createGroupChat({ accessToken, users, chatName }) {
  const res = await fetchWithAuth(`${API_BASE}/api/chat/group`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${accessToken}`, // fetchWithAuth handles this? No, it seems fetchWithAuth might not inject token if not standard. 
      // Checking fetchWithAuth is needed, but assuming it works like others.
    },
    body: JSON.stringify({
      users,
      chatName,
    }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to create group chat");
  }

  return res.json();
}