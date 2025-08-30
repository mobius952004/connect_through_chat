const API_BASE = "http://localhost:3000";

// Tokens stored/retrieved from localStorage
function getAccessToken() {
  return localStorage.getItem("accessToken");
}
function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}
function setTokens({ accessToken, refreshToken }) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

// Refresh access token using refresh token
export async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token available");
  const res = await fetch(`${API_BASE}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Refresh failed");
  setTokens(data);
  return data.accessToken;
}

// Central fetch with automatic token and refresh logic
async function apiFetch(url, options = {}, retry = true) {
  const accessToken = getAccessToken();
  const headers = {
    ...(options.headers || {}),
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  };

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  if (res.status === 401 && retry) {
    try {
      const newAccess = await refreshAccessToken();
      return apiFetch(
        url,
        {
          ...options,
          headers: { ...headers, Authorization: `Bearer ${newAccess}` },
        },
        false
      );
    } catch (err) {
      throw new Error("Session expired, please login again");
    }
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API Error");
  return data;
}

// ------------------------- AUTH & USER APIs -------------------------

// Signup user (no token needed)
export async function signupUser({ username, password, email }) {
  const res = await fetch(`${API_BASE}/api/auth/user/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Signup failed");
  return data;
}

// Login user (no token needed); save tokens on success
export async function loginUser({ email, password }) {
  const res = await fetch(`${API_BASE}/api/auth/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  setTokens(data);
  return data;
}

// Get user profile (token handled internally)
export function fetchProfile() {
  return apiFetch("/api/user/profile");
}

// Update username
export function updateUsername(newUsername) {
  return apiFetch("/api/user/profile/username", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newUsername }),
  });
}

// Update password
export function updatePassword(currentPassword, newPassword) {
  return apiFetch("/api/user/profile/password", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

// Update profile picture (by URL)
export function updateProfilePic(profilePic) {
  return apiFetch("/api/user/profile/picture", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profilePic }),
  });
}

// Get all users (public or protected depending on backend)
export function getallusers() {
  return apiFetch("/api/user/getallusers", { method: "GET" });
}