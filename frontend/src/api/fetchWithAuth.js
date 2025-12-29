import { refreshAccessToken } from "./auth";
import { getAccessToken } from "../utils/token";

export async function fetchWithAuth(url, options = {}) {
  const token = getAccessToken();

  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (res.status !== 401) return res;

  const newToken = await refreshAccessToken();

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${newToken}`,
    },
    credentials: "include",
  });
}
