import { getAccessToken } from "../utils/token";
import { refreshAccessToken } from "./auth";
const API_BASE = import.meta.env.VITE_API_BASE_URL;


export async function fetchWithAuth(url, options = {}) {
  let token = getAccessToken();

// const headers={
//   ...(options.headers || {}),
//   Authorization: `Bearer ${token}`

// }

  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (res.status !== 401) return res;

  // refresh token
  const refreshRes = await refreshAccessToken()

  if (!refreshRes.ok) throw new Error("Session expired");

  const { accessToken } = await refreshRes.json();
  localStorage.setItem("accessToken", accessToken);

  // retry original request
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });
}
