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
    throw new Error(data.message || "Signin Failed")
  }
  return data
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


}