import { fetchWithAuth } from "./fetchWithAuth";
const API_BASE = import.meta.env.VITE_API_BASE_URL;






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