// 📁 front/src/api/auth.js

// import { json } from "express";
import { saveAccessToken } from "../utils/token";
import { fetchWithAuth } from "./fetchWithAuth";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// ✅ Signup user
export async function signupUser({ username, password, email }) {
  const res = await fetch(`${API_BASE}/api/auth/user/signup`, {

    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
  });

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Signup Failed")
  }
  return data
}

// ✅ Login user
export async function loginUser({ email, password }) {
  const res = await fetch(`${API_BASE}/api/auth/user/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Signup Failed")
  }
  return data
}

// ✅ Get user profile (requires access token)
export async function fetchProfile() {
  const res = await fetchWithAuth(`${API_BASE}/api/user/profile`, {
    method:"GET",

  });

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Signup Failed")
  }
  return data
}

// ✅ Update username
export async function updateUsername(accessToken, newUsername) {
  const res = await fetch(`${API_BASE}/api/user/profile/username`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ newUsername }),
  });
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "user name not changed")
  }
  return data.user
}

// ✅ Update password
export async function updatePassword(accessToken, currentPassword, newPassword) {
  const res = await fetch(`${API_BASE}/api/user/profile/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  return res.json();
}

// ✅ Update profile picture (by URL)
export async function updateProfilePic(accessToken, profilePic) {
  const res = await fetch(`${API_BASE}/api/user/profile/picture`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ profilePic }),
  });
  return res.json();
}

export async function getallusers() {
  // console.log(accessToken)
  const res = await fetchWithAuth(`${API_BASE}/api/user/getallusers`, {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    //   // Authorization: `Bearer ${accessToken}`,
    // },
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "users not found")
  }
  return data
}

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
export async function getMessages(chatId) {
  const res = await fetchWithAuth(`${API_BASE}/api/messages/${chatId}`, {
    method: "GET",
    // headers: {
    
    //   Authorization: `Bearer ${accessToken}`,
    // },


  })
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Chat list getting error");
  }

  return data;
}


let refreshPromise = null
export async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_BASE}/api/auth/user/refresh`, {
      method: "POST",
      credentials: "include",
    }).then(async (res) => {
      if (!res.ok) throw new Error("Refresh Failed")
      const { accessToken } = await res.json()
      saveAccessToken(accessToken)
      return accessToken
    })
      .finally(() => {
        refreshPromise = null
      });
  }
  return refreshPromise

  // if (!res.ok) throw new Error("Refresh failed");

  // const { accessToken } = await res.json();
  // console.log("new access token",accessToken)
  // saveAccessToken(accessToken);
  // return accessToken;
}